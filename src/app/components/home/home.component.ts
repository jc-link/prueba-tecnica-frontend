import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../../services/main-service.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  selectedFile: File | null = null;

  constructor(
     private router: Router,
     private mainService: MainServiceService) { }

  async ngOnInit() {
    await this.fetchData();
  }

  logout() {
    this.mainService.logoutUser();
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    if (!this.selectedFile) {
      alert('No file selected');
      return;
    }

    const isValid = await this.validFileLength();
    if (!isValid) {
      Swal.fire({
        title: 'Error!',
        text: 'El archivo debe contener al menos 5 registros.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.mainService.uploadFile(formData).subscribe(
      (res) => {
        this.fetchData();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  fetchData() {
    this.mainService.fetchData().subscribe(
      (res: any) => {
        this.data = res;
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  validFileLength(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        resolve(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const dataWithoutHeaders = jsonData.slice(1);

        const filteredData = dataWithoutHeaders.filter((row: any) => {
          return row.some((cell: any) => cell !== null && cell !== undefined && cell !== '');
        });
        console.log(filteredData.length);
        if (filteredData.length < 5) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(this.selectedFile);
    });
  }

}
