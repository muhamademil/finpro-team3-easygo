"use strict";
// check badge apakah tenant
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const response_error_1 = require("@/error/response.error");
const tenantMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== 'TENANT') {
        return next(new response_error_1.ResponseError(403, 'Forbidden: Akses ditolak. Hanya untuk tenant.'));
    }
    next();
};
exports.tenantMiddleware = tenantMiddleware;
