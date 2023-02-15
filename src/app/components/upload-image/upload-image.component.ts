import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  fileForm!: FormGroup;
  filesList: any[];
  urlsList: any[];
  filesListKeys: any[];

  constructor(public fb: FormBuilder) {
    this.fileForm = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });

    this.filesList = [];
    this.urlsList = [];
    this.filesListKeys = [];
  }

  ngOnInit(): void {}

  isValidInput(form: FormGroup, fieldName: string): boolean {
    return (
      (form.get(fieldName) && !form.get(fieldName)?.hasError('required')) ??
      false
    );
  }

  onFileChange(event: any) {
    const multiplier = 1000;

    if (event.target.files.length) {
      const files = event.target.files;

      if (files.length === 1) {
        // if (files[0].size < multiplier * 1024) {
        //   this.filesList.push(files[0]);
        // }

        this.filesList.push(files[0]);
      } else if (files.length > 1) {
        // if (this.calcBacthSize(files) < multiplier * files.length * 1024) {
        //   for (let i = 0; i < files.length; i++) {
        //     this.filesList.push(files[i]);
        //   }
        // }

        for (let i = 0; i < files.length; i++) {
          this.filesList.push(files[i]);
        }
      }

      for (let i = 0; i < this.filesList.length; i++) {
        this.previewImage(this.filesList[i]);
      }

      // for (let i = 0; i < listLenght; i++) {
      //   if (listLenght === 1) {
      //     if (files[0].size < multiplier * 1024) {
      //       this.filesList.push(files[i]);
      //       this.previewImage(files[i]);
      //     } else {
      //       alert('O arquivo excedeu o tamanho máximo de 10kb');
      //       this.fileForm.get('file')?.patchValue('');
      //       return;
      //     }
      //   } else {
      //     var batchSize = 0;
      //     for (let i = 0; i < listLenght; i++) {
      //       batchSize += files[i].size;
      //     }
      //     if (batchSize < multiplier * listLenght * 1024) {
      //       this.previewImage(files[i]);
      //     } else {
      //       alert('Os arquivos excederam o tamanho máximo de 30kb');
      //       this.fileForm.get('file')?.patchValue('');
      //       return;
      //     }
      //   }
      // }

      this.filesListKeys = Array.from(this.filesList.keys());
    }
  }

  previewImage(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.urlsList.push(event.target.result);
    };
  }

  calcBacthSize(batch: any): number {
    let batchSize = 0;
    for (let i = 0; i < batch.length; i++) {
      batchSize += batch[i].size;
    }

    return batchSize;
  }

  clearInput() {
    this.fileForm.get('file')?.patchValue('');
  }

  submit() {
    // if (this.fileForm.invalid) return;
    // console.log('Enviou a imagem');
    console.log(this.filesList.length);
  }
}
