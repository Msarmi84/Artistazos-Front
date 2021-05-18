import { Component, EventEmitter, OnInit, Inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplines } from 'src/app/models/disciplines';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


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
  selectDisciplines = new FormControl();
  tag:string
  tags:string[] = [];
  tag3:string
  disciplinesValues: string[];
  formData: FormData;
  disciplinesString: string;
  


  @Output() formSubmitted = new EventEmitter<FormData>();
  disciplinesLowerCase: string;

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
      tag: [''],
      discipline:[['']]
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
    

   console.log(this.form)
    
    
    formData.append('discipline', this.disciplinesLowerCase)
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

  addTag(event){
    if (event.keyCode==32 || event.keyCode=='Space'){
      this.tag = event.target.value;
      console.log(this.tag)

      event.target.value ='';

      this.tags.push(this.tag)
      console.log(this.tags)

     this.tag3 = this.tags.toString();
     console.log(this.tag3, 'tag 3333333333')

     this.tag3 = this.tag3.toLowerCase()
     console.log(this.tag3)

    }
    // console.log("pulso la tecla aaaaa " + KeyboardEvent.key)
  }

  removeTag(tag){
    this.tags = this.tags.filter((i) => i !== tag);
    this.tag3 = this.tags.toString();
  }

  clickDiscipline(){
    console.log('entra en click')
    console.log(this.selectDisciplines)
    this.disciplinesValues = this.selectDisciplines.value;
    console.log('estas síiii')
    console.log(this.disciplinesValues.toString())
    this.disciplinesString = this.disciplinesValues.toString();
    this.disciplinesLowerCase = this.disciplinesString.toLowerCase();
    
  }

}
