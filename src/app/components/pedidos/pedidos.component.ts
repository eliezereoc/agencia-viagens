import { Component, OnInit } from '@angular/core';
import { PedidosService, Cidades, Paises } from './pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  paises: Paises[] = [];
  paisOrigem: Paises | any;
  cidadeOrigem: Cidades | any;
  paisDestino: Paises | any;
  cidadeDestino: Cidades | null = null;
  adultos: number = 0;
  criancas: number = 0;
  primeiraClasse: boolean = false;
  milhas: number = 0;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.pedidosService.getCountries().subscribe((paises) => {
      this.paises = paises;
      console.log(paises);
    });
  }

  get distance() {
    if (this.cidadeOrigem && this.cidadeDestino) {
      return this.pedidosService.computeDistance(
        this.cidadeOrigem,
        this.cidadeDestino
      );
    }
    return 0;
  }

  get somaPais() {
    return this.paisOrigem === this.paisDestino;
  }

  get procePorAdulto() {
    let factor = this.somaPais ? 0.3 : 0.5;
    if (this.primeiraClasse) {
      factor *= 1.8;
    }
    return factor * this.distance;
  }

  get precoMilhas() {
    return this.milhas * 0.02;
  }

  get precoPorCrianca() {
    let factor = this.somaPais ? 0.15 : 0.25;
    if (this.primeiraClasse) {
      factor *= 1.4;
    }
    return factor * this.distance;
  }

  get precoTotal() {
    return (
      this.adultos * this.procePorAdulto + this.criancas * this.precoPorCrianca
    );
  }

  get maxMilhas() {
    return Math.floor(this.precoTotal / 0.02);
    return 100;
  }

  get errorMessage() {
    if (!this.cidadeOrigem || !this.cidadeDestino) {
      return 'Escolha uma origem e um destino.';
    } else if (this.cidadeOrigem === this.cidadeDestino) {
      return 'Escolha um destino diferente da origem.';
    } else if (this.adultos <= 0) {
      return 'Adicione ao menos um adulto.';
    }
    return '';
  }
}
