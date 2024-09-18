import { Component } from '@angular/core';
import { ConversionService } from '../services/conversion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent {
  value!: number;
  fromUnit!: string;
  toUnit!: string;
  result!: any;
  errorMessage: string = '';

  value1!: number;
  unit1!: string;
  value2!: number;
  unit2!: string;
  operationResult!: any;
  currentOperation!: string;
  operationErrorMessage: string = '';

  constructor(private conversionService: ConversionService) { }

  convert() {
    this.errorMessage = '';
    this.result = '';
    this.conversionService.convert(this.value, this.fromUnit, this.toUnit)
      .subscribe({
        next: (data) => this.result = data, 
        error: (error) => this.errorMessage = error
      });
  }

  add() {
    this.operationErrorMessage = '';  // Clear previous error message
    this.operationResult = '';        // Clear previous result
    this.currentOperation = 'add';    // Set the current operation to "add"
    
    this.conversionService.add(this.value1, this.unit1, this.value2, this.unit2)
      .subscribe({
        next: (data) => {
          console.log('Addition API Response:', data);
          this.operationResult = {
            ...data,
            total_value_in_unit1: data.total_value_in_unit1,
            total_value_in_unit2: data.total_value_in_unit2
          };
        },
        error: (error) => {
          console.error('Addition API Error:', error);
          this.operationErrorMessage = error;  // Display the error message
        }
      });
  }
  
  subtract() {
    this.operationErrorMessage = '';  // Clear previous error message
    this.operationResult = '';        // Clear previous result
    this.currentOperation = 'subtract';  // Set the current operation to "subtract"
  
    this.conversionService.subtract(this.value1, this.unit1, this.value2, this.unit2)
      .subscribe({
        next: (data) => {
          console.log('Subtraction API Response:', data);
          this.operationResult = {
            ...data,
            result_in_unit1: data.result_in_unit1,
            result_in_unit2: data.result_in_unit2
          };
        },
        error: (error) => {
          console.error('Subtraction API Error:', error);
          this.operationErrorMessage = error;  // Display the error message
        }
      });
  }
}
