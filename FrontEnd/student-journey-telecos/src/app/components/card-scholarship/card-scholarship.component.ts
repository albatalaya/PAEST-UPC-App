import { Component, OnInit, Input } from '@angular/core';
import { ScholarshipsService } from 'src/app/services/scholarships/scholarships.service';

@Component({
  selector: 'app-card-scholarship',
  templateUrl: './card-scholarship.component.html',
  styleUrls: ['./card-scholarship.component.scss'],
})
export class CardScholarshipComponent implements OnInit {

  @Input() public scholarshipItem: any;
  status = 0; // 0 -> non state; 1 -> proximament; 2 -> oberta; 3 -> tancada
  constructor(private scholarshipService: ScholarshipsService) { }

  async ngOnInit() {
    this.scholarshipItem.status = await this.scholarshipService.getStatus(this.scholarshipItem.startDate, this.scholarshipItem.endDate);
  }
}
