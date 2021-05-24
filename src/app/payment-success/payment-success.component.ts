import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private lss: LocalStorageService) { }

  ngOnInit(): void {
      this.route.queryParams
        .subscribe(params => {
  
          this.complete(params.session_id);
        }
      );
  }

  complete(session_id: string) {
    this.paymentService.complete(session_id).subscribe(() => {
      this.lss.cleanProducts();
    })
  }

}
