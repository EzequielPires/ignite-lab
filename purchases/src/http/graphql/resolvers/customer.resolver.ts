import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomerService } from 'src/services/customers.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
    constructor(
        private customerService: CustomerService,
        private purchasesService: PurchasesService
    ) { }

    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me(@CurrentUser() user: AuthUser) {
        return this.customerService.getCustomerByAuthUserId(user.sub);
    }

    @ResolveField()
    purchases(
        @Parent() customer: Customer,
    ) {
        return this.purchasesService.listAllFromCustomer(customer.id)
    }
}
