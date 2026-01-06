# Application Review: RocketRug.io

---

## Critical Issues

### 1. **Coins Router Not Registered**

- **Location**: `app.js`
- **Issue**: The `/api/coins.js` router exists but is never registered in `app.js`
- **Impact**: All coin endpoints are completely unreachable
- **Fix**: Add `app.use("/coins", coinsRouter)` in `app.js`

### 2. **Rug Pull Endpoint Missing Await and Response**

- **Location**: `api/coins.js` lines 91-93
- **Issue**:
  - Database operations are not awaited
  - No response is sent after the rug pull operation
- **Impact**: Operations may not complete, client hangs waiting for response
- **Fix**: Add `await` to all database operations and send a response

### 3. **Import Path Errors in Combined Queries**

- **Location**: `db/queries/combined.js` lines 8-9
- **Issue**: Uses incorrect import paths (`#db/coins` and `#db/users` instead of `#db/queries/coins` and `#db/queries/users`)
- **Impact**: File cannot be imported/used
- **Note**: This file appears incomplete/unused

### 4. **Missing Foreign Key Constraints**

- **Location**: `db/schema.sql`
- **Issue**: No foreign key constraints defined:
  - `coins.creator_id` → `users.id`
  - `transactions.user_id` → `users.id`
  - `transactions.coin_id` → `coins.id`
  - `coin_history.coin_id` → `coins.id`
- **Impact**: Risk of orphaned records, data integrity issues
- **Recommendation**: Add foreign key constraints with appropriate CASCADE/SET NULL behavior

---

## Bugs and Logic Issues

### 5. **Unused Parameter in `updateCoinRugPulled`**

- **Location**: `db/queries/coins.js` line 181
- **Issue**: Function accepts `rugpulled` parameter but doesn't use it
- **Fix**: Remove parameter or use it appropriately

### 6. **Missing Response in Rug Pull Endpoint**

- **Location**: `api/coins.js` line 84-98
- **Issue**: Endpoint doesn't send a response after operations
- **Fix**: Add `res.status(200).send(...)` or appropriate response

### 7. **Incomplete Rug Pull Logic**

- **Location**: `api/coins.js` line 84-98
- **Issues**:
  - Doesn't increment user's rug pull count
  - Doesn't log the transaction
  - Should verify coin isn't already rug pulled
- **Recommendation**: Complete the rug pull workflow

### 8. **Missing Buy/Sell Endpoints**

- **Location**: `api/coins.js`
- **Issue**: `db/queries/combined.js` has `buyCoins` and `sellCoins` functions, but no API endpoints exist
- **Impact**: Core functionality from README is missing
- **Recommendation**: Implement POST endpoints for buying/selling coins

---

## Low Priority Issues

### 9. **Missing Transaction Logging**

- **Location**: `db/queries/combined.js`
- **Issue**: Buy/sell operations should create transaction records but don't
- **Impact**: Transaction history incomplete
- **Recommendation**: Add transaction logging to `buyCoins` and `sellCoins` functions

---

## Positive Aspects

- ✅ Good use of parameterized queries (prevents SQL injection)
- ✅ Password hashing with bcrypt
- ✅ JWT authentication implementation
- ✅ Clean middleware structure
- ✅ Error handling middleware for PostgreSQL errors
- ✅ Type checking in route parameters
- ✅ Good project structure and organization
- ✅ Clear separation of concerns (queries, routes, middleware)

---
