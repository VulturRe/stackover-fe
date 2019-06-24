import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthInterceptor } from 'src/app/_interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/common/card/card.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { RestorePageComponent } from './components/pages/restore-page/restore-page.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { ResetPageComponent } from './components/pages/reset-page/reset-page.component';
import { MessageComponent } from './components/common/message/message.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SearchComponent } from './components/common/search/search.component';
import { QuestionComponent } from './components/common/question/question.component';
import { QuickSearchComponent } from './components/common/quick-search/quick-search.component';
import { QuestionPageComponent } from './components/pages/question-page/question-page.component';
import { AnswerComponent } from './components/common/answer/answer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SearchPageComponent,
    CardComponent,
    RestorePageComponent,
    RegisterPageComponent,
    ResetPageComponent,
    MessageComponent,
    HeaderComponent,
    SearchComponent,
    QuestionComponent,
    QuickSearchComponent,
    QuestionPageComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [QuickSearchComponent]
})
export class AppModule {}
