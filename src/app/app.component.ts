import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public options: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public labels: Label[] = ['5', '6', '7', '8', '12']; // Nombre etudiants
  public type: ChartType = 'bar';
  public legend = true;
  public plugins = [pluginDataLabels];

  public ages: ChartDataSets[] = [
    { data: [18, 20, 25, 26, 28], label: 'Ages' }, // les ages
  ];

  candidats = [];

  constructor() { }

  ngOnInit(): void {
    this.count(this.candidats);
  }

  transformDate(date: any): number {
    return 15;
  }

  count(candidats: any[]): void {
    const length = candidats.length;
    for (let i = 0; i < length; i++) {
      const age = this.transformDate(candidats[i].naissance);
      let count = 0;
      for (let j = 1; j < length; j++) {
        if (age === this.transformDate(candidats[j].naissance)) {
          count++;
        }
      }
      this.labels.push(`${age}`);
      this.ages[0].data.push(count);
    }
  }
}
