import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Roles } from './models/enum/roles';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('deleteUserModal') public deleteUserModal: ModalDirective;

  users: User[] = [];
  userDelete: User;
  userRoles = Roles;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: -1,
      lengthChange: false,
      info: false,
      searching: false,
      language: {
        paginate: {
          next: 'Próximo',
          first: 'Primeira',
          last: 'Ultima',
          previous: 'Anterior'
        }

      }
    };

    this.userService.findAll().subscribe(resp => {
      this.users = resp;
      this.dtTrigger.next();
    }), error => {
      this.toaster.error('Não foi possível carregar os Usuários!')
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  insert() {
    this.router.navigate(['/users/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/users/edit', id])

  }

  deletePreview(user: User) {
    this.userDelete = user;
    this.deleteUserModal.show();
  }

  delete(id: number) {
    this.deleteUserModal.hide();
    this.userService.delete(id).subscribe(
      (response) => {
        this.toaster.success(`Usuário <b>${this.userDelete.name}</b> deletado com sucesso!`);
        this.ngOnInit();
      },
      (error) => {
        this.toaster.error('Ocorreu um erro ao deletar o Usuário.');
      }
    );
  }


}
