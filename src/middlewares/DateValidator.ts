import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import * as moment from 'moment'
  
  @ValidatorConstraint({ name: 'IsCustomDate', async: true })
  @Injectable()
  export class CustomDateConstraint implements ValidatorConstraintInterface {
    private readonly val: (inp: string, format: string) => boolean
    constructor() {
      this.val = (inp: string, format: string) => moment(inp, format).isValid()
    }
    validate(textThatShouldBeDate: string, args: ValidationArguments): boolean {
      // would be NaN when failing and that is falsy else a number(timestamp)
      return (
        this.val(textThatShouldBeDate, 'DD/MM/YYYY') ||
        textThatShouldBeDate === null
      )
    }
  
    defaultMessage(args: ValidationArguments): string {
      const { property } = args
      return `${property} should be in format DD/MM/YYYY`
    }
  }
  
  export function IsCustomDate(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName, // the name of the prop this decrator have been place on top of it
        options: validationOptions, // from @dec({...})
        validator: CustomDateConstraint,
        async: false,
      })
    }
  }
  