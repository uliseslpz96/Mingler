import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Observable, Observer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzIconModule, NzToolTipModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    validateForm!: FormGroup<{
        username: FormControl<string>;
        mobile: FormControl<string>;
        email: FormControl<string>;
        password: FormControl<string>;
        confirm: FormControl<string>;
    }>;

    // current locale is key of the nzAutoTips
    // if it is not found, it will be searched again with `default`
    autoTips: Record<string, Record<string, string>> = {
        'zh-cn': {
            required: '必填项'
        },
        en: {
            required: 'Input is required'
        },
        default: {
            email: '邮箱格式不正确/The input is not valid email'
        }
    };

    constructor(private fb: NonNullableFormBuilder) {
        this.validateForm = this.fb.group({
            username: this.fb.control(
                '',
                [MyValidators.required, MyValidators.maxLength(12), MyValidators.minLength(6)],
                [this.usernameAsyncValidator]
            ),
            mobile: this.fb.control('', [MyValidators.required, MyValidators.mobile]),
            email: this.fb.control('', [MyValidators.required, MyValidators.email]),
            password: this.fb.control('', [MyValidators.required]),
            confirm: this.fb.control('', [this.confirmValidator])
        });
    }

    ngOnInit(): void {
        this.validateForm.controls.password.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.validateForm.controls.confirm.updateValueAndValidity();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value);
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    usernameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        return new Observable((observer: Observer<MyValidationErrors | null>) => {
            setTimeout(() => {
                if (control.value === 'JasonWood') {
                    observer.next({
                        duplicated: { 'zh-cn': `用户名已存在`, en: `The username is redundant!` }
                    });
                } else {
                    observer.next(null);
                }
                observer.complete();
            }, 1000);
        });
    }

    confirmValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    }
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
    static override minLength(minLength: number): ValidatorFn {
        return (control: AbstractControl): MyValidationErrors | null => {
            if (Validators.minLength(minLength)(control) === null) {
                return null;
            }
            return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
        };
    }

    static override maxLength(maxLength: number): ValidatorFn {
        return (control: AbstractControl): MyValidationErrors | null => {
            if (Validators.maxLength(maxLength)(control) === null) {
                return null;
            }
            return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
        };
    }

    static mobile(control: AbstractControl): MyValidationErrors | null {
        const value = control.value;

        if (isEmptyInputValue(value)) {
            return null;
        }

        return isMobile(value)
            ? null
            : { mobile: { 'zh-cn': `手机号码格式不正确`, en: `Mobile phone number is not valid` } };
    }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
    return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
    return typeof value === 'string' && /(^\+52\d{10}$)/.test(value);
}