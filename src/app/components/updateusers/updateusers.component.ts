import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-updateusers',
  templateUrl: './updateusers.component.html',
  styleUrls: ['./updateusers.component.css']
})
export class UpdateusersComponent implements OnInit {
  
  user?: User
  data: any;
  updateform: FormGroup;

  constructor(private service: UserService, private route: ActivatedRoute, private router : Router) { 
    this.updateform = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    })
  }
    

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.service.getUserById(id).subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
    });
  }
  

  submit() {
    this.data = this.updateform.value;
    console.log(this.data);
    
    this.service.updateUser(this.user?.id, this.data).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    });   
  }
}

