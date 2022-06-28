import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CurrentUser } from 'src/http/auth/current-user';
import { CustomerService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/products';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customersService: CustomerService
    ) { }

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases() {
        return this.purchasesService.listAllPurchases();
    }

    @ResolveField()
    product(
        @Parent() purchase: Purchase,
    ) {
        return this.productsService.getProductById(purchase.productId)
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async createPurchase(
        @Args('data') data:CreatePurchaseInput,
        @CurrentUser() user
    ) {
        let customer = await this.customersService.getCustomerByAuthUserId(user.sub)

        if(!customer) {
            customer = await this.customersService.createCustomer({
                authUserId: user.sub
            })
        }

        return this.purchasesService.createPurchase({
            productId: data.productId,
            customerId: customer.id
        })
    }
}