import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from '../../shared/customer.service';
import { Customer } from '../../shared/customer.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

    customerList: Customer[];

    constructor(private customer: CustomerService, private service: OrderService, private dialog: MatDialog) { }

    ngOnInit() {
        this.resetForm();
        this.customer.getCustomerList().pipe(
            catchError((err) => { alert(err); }), ).subscribe((result) =>.{ this.customerList = result }));
  }

    resetForm(form?: NgForm) {
        if (form != null)
            form.resetForm();
        this.service.formData = {
            OrderId: null,
            OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
            CustomerID: 0,
            PMethod: '',
            GTotal: 0
        };
        this.service.orderItems = [];
    }

    AddOrEditOrderItem(orderItemIndex, OrderID) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = { orderItemIndex, OrderID };
        this.dialog.open(OrderItemsComponent, dialogConfig);
    }

    onDeleteOrderItem(orderItemID: number, i: number) {
        this.service.orderItems.splice(i, 1);
    }
}
