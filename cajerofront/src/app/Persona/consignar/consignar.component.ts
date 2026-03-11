import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { ListarComponent } from '../listar/listar.component';
import { saldoFin } from 'src/app/Modelo/Persona';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consignar',
  templateUrl: './consignar.component.html',
  styleUrls: ['./consignar.component.css']
})
export class ConsignarComponent {
  personaForm: FormGroup;
  lista!: ListarComponent;
  id: number | any
  saldo: number | any
  saldoFinal: number | any

  constructor(private fb: FormBuilder,
    private router: Router,
    private servicePerson: ServiceService,
    private aRouter: ActivatedRoute,
    private toastr:ToastrService
  ) {
    this.personaForm = this.fb.group({
      saldo: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.saldo = this.aRouter.snapshot.paramMap.get('saldo');
  }
  ngOnInit() {
    this.capture()

  }

  capture() {
    let valorRetiro = this.personaForm.get('saldo')?.value;

    return valorRetiro
  }
  Consignar() {
    let valorRetiro = this.capture()
    this.saldoFinal = parseFloat(this.saldo) + parseFloat(valorRetiro)
    console.log(this.saldoFinal)
    const saldo: saldoFin = {
      saldo: this.saldoFinal
    }

    this.servicePerson.update(this.id, saldo).subscribe(
      data => {
        this.toastr.success("Se ha consignado correctamente","Consignación realizada")
        this.router.navigate(["/listar"])
      }, error => {
        this.toastr.success("No se ha podido consignar","Consignación rechazada")
      }
    );
  }
}

