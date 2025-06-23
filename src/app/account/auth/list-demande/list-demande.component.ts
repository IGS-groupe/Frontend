import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/core/models/demande.model';
import { DemandeService } from '../demande.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {
  demandes: Demande[] = [];
  constructor(private demandeService: DemandeService,private router: Router) {}

  ngOnInit(): void {
    this.loadDemandes();
  }
  loadDemandes(): void {
    this.demandeService.getDemandesByUserId()
      .subscribe({
        next: (results) => {
          this.demandes = results;
        },
        error: (error) => {
          console.error('Failed to load demandes:', error);
          this.router.navigate(['/account/login']);
        }
      });
  }
  
  details(demandeId:number){
    this.router.navigate(['/account/Listechantillons'], { queryParams: { demandeId: demandeId } });
  }
  acceptDemande(id: number) {
    console.log('Demande accepted with ID:', id);
    // Here you would handle the acceptance of the demande
  }

  refuseDemande(id: number) {
    console.log('Demande refused with ID:', id);
    // Here you would handle the refusal of the demande
  }

  saveAsPdf() {
    const data = document.getElementById('table-to-pdf') as HTMLElement;
    const button = document.querySelector('.table-button.download-button') as HTMLElement; // Type assertion
    const currentDate = new Date().toLocaleDateString('fr-FR'); // Format the date as you prefer, using French locale here
  
    if (button) button.style.visibility = 'hidden'; // Hide the button
  
    html2canvas(data, {
      scale: 2, // Adjust this for better resolution
      windowWidth: data.offsetWidth,
      windowHeight: data.offsetHeight
    }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation, 'p' for portrait could also be used
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
  
      const scaleToFitWidth = pdfWidth / canvasWidth;
      const scaleToFitHeight = pdfHeight / canvasHeight;
      const scale = Math.min(scaleToFitWidth, scaleToFitHeight);
  
      const imgWidth = canvasWidth * scale;
      const imgHeight = canvasHeight * scale;
  
      const x = (pdfWidth - imgWidth) / 2;
      const y = 15; // Starting a bit lower to make space for the date
  
      // Add date at the top left
      pdf.setFontSize(10); // Set the font size for the date
      pdf.text(currentDate, 10, 10); // Position the date at 10mm from the top, 10mm from the left
  
      // Add the canvas image
      pdf.addImage(contentDataURL, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('DemandesSummary.pdf'); // Saving the PDF with a filename
  
      if (button) button.style.visibility = 'visible'; // Show the button again
    });
  }
  exportToExcel(): void {
    const formattedData = this.demandes.map(demande => ({
      'ID': demande.demandeId,
      'Demande pour': demande.demandePour,
      'Envoyé au laboratoire': demande.envoyeAuLaboratoire,
      'Courriels supplémentaires': demande.courrielsSupplementaires,
      'Bon de commande': demande.bonDeCommande,
      'Un échantillon': demande.unEchantillon ? 'Oui' : 'Non',
      'État': demande.etat,
      'Langue du certificat': demande.langueDuCertificat,
      'Commentaires internes': demande.commentairesInternes,
      'User ID': demande.userId || ''
    }));

  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);

    
    const columnWidths = [
      { wch: 10 },
      { wch: 30 }, 
      { wch: 20 }, 
      { wch: 40 },  
      { wch: 20 },
      { wch: 15 },  
      { wch: 15 }, 
      { wch: 20 },  
      { wch: 40 }, 
      { wch: 20 }   
    ];
    worksheet['!cols'] = columnWidths;

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des demandes');

    
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    
    const date = new Date().toISOString().slice(0, 10);
    saveAs(data, `liste_demandes_${date}.xlsx`);
  }

}
