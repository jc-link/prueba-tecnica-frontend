import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../../services/main-service.service';

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

  uploadFile() {
    if (!this.selectedFile) {
      alert('No file selected');
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

}
