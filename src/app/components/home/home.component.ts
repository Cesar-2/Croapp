import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("modalCrearIngresos") modalCrearIngresos: ElementRef;
  @ViewChild("modalCrearGasto") modalCrearGasto: ElementRef;
  private modalRef;

  crearIngresosForm: FormGroup;
  crearGastoForm: FormGroup;

  planes;

  detalles;

  detalle_actual: any;
  show_detalle = false;
  option: any;


  constructor(
    protected loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == undefined) {
      this.router.navigate(['/Login'])
    } else {
      this.getFinance();
      this.construirFormularioCrearIngreso();
      this.construirFormularioCrearGasto();
    }
  }

  getFinance(): void {
    this.loginService.getFinance().subscribe(value => {
      this.planes = value['data'];
    })
  }

  construirFormularioCrearIngreso() {
    this.crearIngresosForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      expected_amount: new FormControl('', [Validators.required,])
    })
  }

  construirFormularioCrearGasto() {
    this.crearGastoForm = new FormGroup({
      name: new FormControl('', [Validators.required,]),
      amount_cost: new FormControl('', [Validators.required,]),
      finance_id: new FormControl('', [Validators.required,])
    })
  }

  planClick(plan) {
    if (this.show_detalle) {
      if (this.detalle_actual == plan) {
        this.show_detalle = !this.show_detalle
      } else {
        this.detalle_actual = plan
        this.detalles = plan['costs'];
      }
    } else {
      this.show_detalle = !this.show_detalle
    }


  }

  public openCrearIngresosModal(): void {
    this.modalRef = this.modalService.open(this.modalCrearIngresos, {
      size: 'm',
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false
    })
  }

  public openCrearGastoModal(): void {
    this.crearGastoForm.controls['finance_id'].setValue(this.detalle_actual['id'])
    this.modalRef = this.modalService.open(this.modalCrearGasto, {
      size: 'm',
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false
    })
  }

  public crearIngresos(): void {
    this.loginService.postFinance(this.crearIngresosForm.value).subscribe(res => {
      this.getFinance();
    })
  }

  public crearGasto(): void {
    this.loginService.postGasto(this.crearGastoForm.value).subscribe(res => {
      this.getFinance();
    })
  }

  public eliminarPlan(plan) {
    this.loginService.deleteFinance(plan.id).subscribe(res => {
      this.getFinance();
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/Login'])
  }
}
