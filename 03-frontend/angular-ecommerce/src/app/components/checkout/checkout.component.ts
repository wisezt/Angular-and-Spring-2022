import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  states: State[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  // startMonth: number = 0;


  constructor(private formBuilder: FormBuilder, private luv2ShopFormService: Luv2ShopFormService, private cartService: CartService) { 
  
    // subscribeTotalQuantity();
}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer: this.formBuilder.group(
          {
            firstName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            email: new FormControl('',
              [Validators.required,
              Validators.pattern(
                '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
              ), Luv2ShopValidators.notOnlyWhiteSpace])
          }
        ),
        shippingAddress: this.formBuilder.group(
          {
            street: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            city: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            state: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace])
          }
        ),
        billingAddress: this.formBuilder.group(
          {
            street: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            city: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            state: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace])
          }
        ),
        creditCard: this.formBuilder.group(
          {
            cardType: new FormControl('', [Validators.required]),
            nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
            cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
            securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
            expirationMonth: new FormControl('', [Validators.required]),
            expirationYear: new FormControl('', [Validators.required]),
          }
        )
      }
    );


    const startMonth: number = new Date().getMonth() + 1;
    // this.startMonth = new Date().getMonth() + 1
    // this.startMonth = 5;
    console.log("startMonth: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );


    // for (let i = this.startMonth ; i <= 12 ; i ++){
    //   this.creditCardMonths.push(i);
    // }




    const startYear: number = new Date().getFullYear();
    console.log("startYear: " + startYear);

    this.luv2ShopFormService.getCreditCardYears(startYear).subscribe(
      data => {
        console.log("Retrieved credit card Year: " + JSON.stringify(data));
        this.creditCardYears = data;


      }
    );


    // for (let i = startYear ; i < startYear+10 ; i ++){
    //   this.creditCardYears.push(i);
    // }


    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        // console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;


      }
    );



    // console.log("test123");
    // for (let temp of this.countries) {
    //   console.log(temp)
    // }


    this.luv2ShopFormService.getStates().subscribe(
      data => {
        // console.log("Retrieved States: " + JSON.stringify(data));
        this.states = data;
      }
    );


      // this.totalPrice = 10;
      // console.log("This is totalPrice:" + this.totalPrice);

      this.subscribeTotalPrice();
      this.subscribeTotalQuantity();

      console.log("Test Random: " + Math.random());


  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('customer')?.value.email);
    console.log("The Shipping Address country is : " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);

    console.log("The Shipping Address state is : " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);

    // console.log("Test: " + this.checkoutFormGroup.value.customer.value.name);
    // console.log("Test: " + this.checkoutFormGroup.get('customer')?.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }



  }

  get firstName() { return this.checkoutFormGroup!.get('customer.firstName')!; }
  get lastName() { return this.checkoutFormGroup!.get('customer.lastName')!; }
  get email() { return this.checkoutFormGroup!.get('customer.email')!; }


  get shippingAddressStreet() { return this.checkoutFormGroup!.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup!.get('shippingAddress.city')!; }
  get shippingAddressState() { return this.checkoutFormGroup!.get('shippingAddress.state')!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup!.get('shippingAddress.zipCode')!; }
  get shippingAddressCountry() { return this.checkoutFormGroup!.get('shippingAddress.country')!; }



  get billingAddressStreet() { return this.checkoutFormGroup!.get('billingAddress.street')!; }
  get billingAddressCity() { return this.checkoutFormGroup!.get('billingAddress.city')!; }
  get billingAddressState() { return this.checkoutFormGroup!.get('billingAddress.state')!; }
  get billingAddressZipCode() { return this.checkoutFormGroup!.get('billingAddress.zipCode')!; }
  get billingAddressCountry() { return this.checkoutFormGroup!.get('billingAddress.country')!; }


  get creditCardType() { return this.checkoutFormGroup!.get('creditCard.cardType')!; }
  get creditCardNumber() { return this.checkoutFormGroup!.get('creditCard.cardNumber')!; }
  get creditCardNameOnCard() { return this.checkoutFormGroup!.get('creditCard.nameOnCard')!; }
  get creditCardSecurityCode() { return this.checkoutFormGroup!.get('creditCard.securityCode')!; }




  copyShippingAddressToBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      this.billingAddressStates = [];
    }

  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;


    if (currentYear === selectedYear) {
      startMonth = new Date().getFullYear() + 1;
      // this.startMonth = new Date().getFullYear() + 1;

    }
    else {
      startMonth = 1;
      // this.startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        // console.log("Retrieved credit card month: " + JSON.stringify(data));
        this.creditCardMonths = data;

      }
    );



  }


  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    // console.log(countryCode);

    this.luv2ShopFormService.getStatesByCode(countryCode).subscribe(
      data => {

        // console.log(data);
        // console.log(formGroupName);
        if (formGroupName == 'shippingAddress') {
          // console.log("A");
          this.shippingAddressStates = data;
        }
        else {
          console.log("B")
          this.billingAddressStates = data;
        }

        // console.log(this.shippingAddressStates);
        // for (let temp of this.shippingAddressStates) {
        //   console.log(temp)
        // }

        formGroup?.get('state')?.setValue(data[0]);

      }
    );

  }

  subscribeTotalPrice() {
    this.cartService.totalPrice.subscribe(
      data => {
        // console.log("Checkout: Subscribe totalPrice ");
        this.totalPrice = data;
        // console.log("data: " + data);
        // console.log("this.totalPrice:" + this.totalPrice);
      }
    );

    // console.log("subscribeTotalPrice: " +  this.totalPrice);
  }

  subscribeTotalQuantity() {
    
    this.cartService.totalQuantity.subscribe(
      data => {
        // console.log("Checkout: Subscribe totalPrice ");
        this.totalQuantity = data;
        // console.log("data: " + data);
        // console.log("this.totalPrice:" + this.totalPrice);
      }
    );

  }





}
