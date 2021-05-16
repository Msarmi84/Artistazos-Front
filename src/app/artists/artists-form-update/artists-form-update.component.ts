import { Component, EventEmitter, OnInit, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplines } from 'src/app/models/disciplines';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';


@Component({
  selector: 'app-artists-form-update',
  templateUrl: './artists-form-update.component.html',
  styleUrls: ['./artists-form-update.component.scss']
})
export class ArtistsFormUpdateComponent implements OnInit {

  form: FormGroup;
  imgPreview = 'assets/images/logonofoto.png';
  // imgFrontPreview = 'assets/images/logonofoto.png';
  imageFile: File;
  // imageFrontFile: File;
  imageUrl = environment.baseUrl + 'images/uploads/';
  disciplines: Disciplines[];
  seleccionados: string[] = [];
  tag:string
  tags:string[]= [];
  tag3:string


  @Output() formSubmitted = new EventEmitter<FormData>();

  constructor(
    formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data?: User
    ) {
    this.form = formBuilder.group({
      user_id:[''],
      artistic_name:[''],
      user_name: ['', Validators.required],
      biography: ['', Validators.required],
      avatar: ['', Validators.required],
      front: ['', Validators.required],
      tag: [[this.tag]],
      discipline:[[]]
    });
   }

   ngOnInit(): void {
    if (this.data?.user_name) {
      this.form.patchValue(this.data);
      this.imgPreview = this.data.avatar ? this.imageUrl + this.data.avatar : 'assets/images/logonofoto.png';
      // this.imgFrontPreview = this.data.front ? this.imageUrl + this.data.front : 'assets/images/logonofoto.png';
    }
    this.getDisciplines();

  }

  //obtiene disciplinas
  getDisciplines(): void {
    this.userService.getDisciplines().subscribe(discipline => this.disciplines = discipline);
  }

  generateFormData(): FormData {
    const formData = new FormData();
    for (const field in this.form.value) {
      if (field) {
        formData.append(field, this.form.value[field]);
      }
    }
    formData.append('tag', this.tag3)
    console.log('console del formdata')
    console.log(formData);

    formData.append('avatar', this.imageFile);
    // formData.append('front', this.imageFrontFile);
    console.log('console del formdata')
    console.log(formData)
    return formData;
  }

  onImageChanged(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files[0];
    this.imageFile = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => this.imgPreview = fileReader.result as string;
  }


  // onFrontChanged(event: InputEvent): void {
  //   const inputTarget = event.target as HTMLInputElement;
  //   const file = inputTarget.files[0];
  //   this.imageFrontFile = file;
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.onload = () => this.imgFrontPreview = fileReader.result as string;
  // }

  addTag(KeyboardEvent){
    if (KeyboardEvent.keyCode==32 || KeyboardEvent.keyCode=='Space'){
      this.tag = KeyboardEvent.target.value;
      KeyboardEvent.target.value ='';
      this.tags.push(this.tag)
     this.tag3 = this.tags.toString();

      console.log(this.tag)
      console.log(this.tags)
    }
    // console.log("pulso la tecla aaaaa " + KeyboardEvent.key)
  }


}
