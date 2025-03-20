import { Component, HostListener, OnInit } from '@angular/core';
import { Opcion } from '../security/opcion';
import { TokenService } from '../security/token.service';
import { Router, RouterLink } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ AppMaterialModule, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMenuOpen = true;
  isMobile = false;
  isLogged = false;
  opciones : Opcion[] = [];

  nombreUsuario = "";

  constructor(private tokenService: TokenService,private router: Router) {
    console.log("MenuComponent >>> constructor >>> " + this.tokenService.getToken());
  }

  ngOnInit() {
    this.checkScreenSize(); 
    console.log("MenuComponent >>> ngOnInit >>> ");

    this.opciones = this.tokenService.getOpciones().filter( x => x.tipo === 1);


    console.log("MenuComponent >>> ngOnInit >>> " + this.tokenService.getToken());
    if (this.tokenService.getToken()) {
      console.log("MenuComponent >>> this.isLogged = true >>> ");
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserNameComplete()|| '{}';
    } else {
      console.log("MenuComponent >>> this.isLogged = false >>> ");
      this.isLogged = false;
      this.router.navigate(['/login']);
    }
    
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      // Si se pasa a móvil, siempre cerrar el menú
      this.isMenuOpen = false;
    } else {
      // Si se pasa a escritorio, siempre abrir el menú
      this.isMenuOpen = true;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  toggleMenu() {
    if (this.isMobile) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  closeMenu(event: Event) {
    if (this.isMobile && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

}