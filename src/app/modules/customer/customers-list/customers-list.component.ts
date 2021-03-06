import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }


  insert() {
    this.router.navigate(['/customer/new'])
  }

  onEdit(id: number) {
    this.router.navigate(['/customer/edit', id])
  }

}

