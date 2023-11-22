"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooks() {
        return this.bookService.getOccupancyOverview();
    }
    async signUpUser(did, password) {
        return this.bookService.signUpUser(did, password);
    }
    async signInUser(did, password) {
        return this.bookService.loginUser(did, password);
    }
    async updateLockStatus(did, lockStatus) {
        return this.bookService.updateLockStatus(did, lockStatus);
    }
    async updateRewardsConsentStatus(did, rewardsConsentStatus) {
        return this.bookService.updateRewardsConsentStatus(did, rewardsConsentStatus);
    }
    async getLatestOccupantCount() {
        return this.bookService.getLatestOccupantCount();
    }
    async getBook(id) {
        return this.bookService.findById(id);
    }
    async deleteBook(id) {
        return this.bookService.deleteById(id);
    }
};
__decorate([
    (0, common_1.Get)('highlights'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all books.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign up a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User signed up successfully.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                did: {
                    type: 'string',
                    description: 'User DID',
                    example: 'bafybmif4izjee5vzslmn6g32o4vifdolkr5wy2c3bn2yywn3j6cezljjjq',
                },
                password: {
                    type: 'string',
                    description: 'User password',
                    example: 'password123',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)('did')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "signUpUser", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User signed in successfully.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                did: {
                    type: 'string',
                    description: 'User DID',
                    example: 'bafybmif4izjee5vzslmn6g32o4vifdolkr5wy2c3bn2yywn3j6cezljjjq',
                },
                password: {
                    type: 'string',
                    description: 'User password',
                    example: 'password123',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)('did')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "signInUser", null);
__decorate([
    (0, common_1.Post)('update-lock-status/:did'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user lock status by DID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User lock status updated successfully.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                lockStatus: {
                    type: 'string',
                    description: 'User lock status (yes or no)',
                    example: 'yes',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('did')),
    __param(1, (0, common_1.Body)('lockStatus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateLockStatus", null);
__decorate([
    (0, common_1.Post)('update-rewards-consent/:did'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user rewards consent status by DID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User rewards consent status updated successfully.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                rewardsConsentStatus: {
                    type: 'string',
                    description: 'User rewards consent status (yes or no)',
                    example: 'yes',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('did')),
    __param(1, (0, common_1.Body)('rewardsConsentStatus')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateRewardsConsentStatus", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get the latest occupant count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the latest occupant count.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getLatestOccupantCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the book with the specified ID.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a book by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the deleted book.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
BookController = __decorate([
    (0, common_1.Controller)('occupancy'),
    (0, swagger_1.ApiTags)('occupancy'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map