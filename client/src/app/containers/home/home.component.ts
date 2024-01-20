import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { take } from 'rxjs';
import { Transaction } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
    lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: 'Guadagni',
                backgroundColor: 'rgba(87,204,153,0.5)',
                borderColor: 'rgba(87,204,153,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
            },
            {
                data: [],
                label: 'Perdite',
                yAxisID: 'y1',
                backgroundColor: 'rgba(255,107,107,0.5)',
                borderColor: 'rgba(255,107,107,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
            },
        ],
        labels: [],
    };

    lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: { tension: 0.2 },
        },
        scales: {
            y: { position: 'left' },
            y1: {
                position: 'right',
                grid: {
                    color: 'rgba(255,0,0,0.3)',
                },
                ticks: {
                    color: 'red',
                },
            },
        },
    };

    pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: [],
        datasets: [{ data: [] }],
    };

    pieChartPlugins = [DatalabelsPlugin];
    pieChartOptions: ChartConfiguration['options'] = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            datalabels: {
                formatter: (value: number, ctx: any) => {
                    return value + ' CHF';
                },
            },
        },
    };

    barChartData: { [key in string]: ChartData<'bar'> } = {
        positive: { labels: [], datasets: [] },
        negative: { labels: [], datasets: [] }
    };

    barChartOptions: ChartConfiguration['options'] = {
        plugins: {
            legend: { display: false },
        },
    };

    transactions: Transaction[] = []

    constructor(
        private transactionsService: TransactionsService,
        private datePipe: DatePipe
    ) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.loadTransactions();
    }

    loadTransactions(): void {
        this.transactionsService.getAll()
            .pipe(take(1))
            .subscribe((transactions) => {
                this.transactions = transactions;
                this.prepareLineChartData();
                this.preparePieChartData();
                this.prepareBarChartData();
            });
    }

    prepareLineChartData(): void {
        this.transactions.forEach((transaction) => {
            const datasetGroup = transaction.account.sign > 0 ? 0 : 1;
            const transactionDate = this.datePipe.transform(transaction.executionDate, 'dd-MM-yyy');

            this.lineChartData.datasets[datasetGroup].data.push(transaction.value);
            this.lineChartData.labels?.push(transactionDate);
        });
    }

    preparePieChartData(): void {
        const transactionsByAccount = this.transactions.map((transaction) => {
            return { [transaction.account.description]: transaction.value }
        });

        const topaccounts = Object.entries(transactionsByAccount.reduce((acc, curr) => {
            let key = Object.keys(curr)[0];
            const value = Object.values(curr)[0];

            key = key.length > 20 ? key.substring(0, 20) + '...' : key;
            acc[key] = (acc[key] || 0) + value;
            return acc;
        }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);

        this.pieChartData.labels = topaccounts.map((account) => account[0]);
        this.pieChartData.datasets![0].data = topaccounts.map((account) => account[1]);

    }

    prepareBarChartData(): void {
        const positives = this.transactions.filter((transaction) => transaction.account.sign > 0);
        const negatives = this.transactions.filter((transaction) => transaction.account.sign < 0);

        this.barChartData["positive"].datasets.push({
            data: positives.map((p) => p.value),
            backgroundColor: 'rgba(87,204,153,0.5)',
            borderColor: 'rgba(87,204,153,1)',
        });
        this.barChartData["positive"].labels!.push(...positives.map((p) => this.datePipe.transform(p.executionDate), 'dd-MM-yyy'));

        this.barChartData["negative"].datasets.push({
            data: negatives.map((p) => p.value),
            backgroundColor: 'rgba(255,107,107,0.5)',
            borderColor: 'rgba(255,107,107,1)',
        });
        this.barChartData["negative"].labels!.push(...negatives.map((p) => this.datePipe.transform(p.executionDate), 'dd-MM-yyy'));
    }
}
