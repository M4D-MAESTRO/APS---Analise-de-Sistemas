import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validacoes } from '../validacoes/validacoes';
import { CompetidorDTO } from '../models/Competidor.DTO';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private formulario:FormGroup;
  public form: FormControl;
  private test:String;
  private competidor:CompetidorDTO;

  constructor(public alerta:AlertController, private router: Router) {
    this.formulario = new FormGroup({
        nome: new FormControl('Luis Henrique', Validators.required),
        email: new FormControl('lh@hot', [Validators.required, Validators.email]),
        cpf: new FormControl('17782119766', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validacoes.ValidaCpf]),
        sexo: new FormControl('Masculino', Validators.required),
        dataNascimento: new FormControl('', Validators.required)
    });   
    
   }

  
   enviarFormulario() { 
     this.competidor = {
      nome : this.formulario.controls['nome'].value,
      email : this.formulario.controls['email'].value,
      cpf: this.formulario.controls['cpf'].value,
      sexo: this.formulario.controls['sexo'].value,
      dataNascimento: this.formulario.controls['dataNascimento'].value      
     }
     this.competidor.dataNascimento =  this.competidor.dataNascimento.substring(0,10);
     let ano = this.competidor.dataNascimento.substring(0,4).trim();
     let mes = this.competidor.dataNascimento.substring(5,7).trim();
     let dia = this.competidor.dataNascimento.substring(8,10).trim();      
     console.log(dia);
     let menor = Validacoes.MaiorQue18AnosNew(parseInt(ano),parseInt(mes),parseInt(dia));
     
     if(menor){
      this.showInsertError();
     }else{
      this.showInsertOk();
     }
     
     

   }

   async showInsertOk() {
    let alert = await this.alerta.create({
      header: 'Sucesso!',
      message: 'Sua inscrição foi confirmada!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('home');
          }
        }
      ]
    });
    await alert.present();
}

async showInsertError() {
  let alert = await this.alerta.create({
    header: 'Erro!',
    message: 'Inscrição inválida! Apenas maiores de 18 anos podem participar',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.router.navigateByUrl('cadastro');
        }
      }
    ]
  });
  await alert.present();
}

  




  ngOnInit() {
  }

}
