import {Component, computed, model, output} from '@angular/core';
import {CustomerModel} from '../domain/customer.model';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-customer-edit',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent {

  customerDetails = model.required<CustomerModel>()
  customerChanged = output<CustomerModel>();

  countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic (Czechia)", "Democratic Republic of the Congo", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
    "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  cities = [
    "Tokyo", "Delhi", "Shanghai", "Dhaka", "São Paulo", "Cairo", "Mexico City",
    "Beijing", "Mumbai", "Osaka", "Chongqing", "Karachi", "Istanbul", "Buenos Aires",
    "Kolkata", "Lagos", "Kinshasa", "Manila", "Rio de Janeiro", "Tianjin", "Guangzhou",
    "Lahore", "Bangalore", "Paris", "Bogotá", "Jakarta", "Chennai", "Lima", "Bangkok",
    "Seoul", "Nagoya", "Hyderabad", "London", "Tehran", "Chicago", "Chengdu", "Nanjing",
    "Wuhan", "Ho Chi Minh City", "Luanda", "Ahmedabad", "Kuala Lumpur", "Xi'an",
    "Hong Kong", "Hangzhou", "Dongguan", "Foshan", "Riyadh", "Shenyang", "Baghdad",
    "Santiago", "Surat", "Madrid", "Pune", "Houston", "Dallas", "Toronto",
    "Dar es Salaam", "Miami", "Belo Horizonte", "Singapore", "Philadelphia", "Atlanta",
    "Khartoum", "Barcelona", "Johannesburg", "Saint Petersburg", "Qingdao", "Dalian",
    "Washington, D.C.", "Yangon", "Alexandria", "Ankara", "Abidjan", "Monterrey",
    "Hanoi", "Sydney", "Melbourne", "Berlin", "Brasília", "Cape Town", "Casablanca",
    "Jinan", "Harbin", "Zhengzhou", "Guadalajara", "Kabul", "Dubai", "Medellín",
    "Recife", "Nairobi", "Busan", "San Francisco", "Fortaleza", "Kano", "Rome",
    "Montreal", "Addis Ababa", "Shijiazhuang", "Changsha", "Jiddah", "Yaoundé",
    "Tel Aviv", "Ningbo", "Shantou", "Hefei", "Changchun", "Kunming", "Urumqi",
    "Fuzhou", "Xiamen", "Nanchang", "Tangshan", "Wuxi", "Faisalabad", "Ibadan",
    "Lucknow", "Port Harcourt", "Guiyang", "Dakar", "Santo Domingo", "Asunción",
    "Seattle", "Detroit", "Sanaa", "Berlin", "Wuxi", "Lanzhou", "Tashkent", "Aleppo",
    "Pyongyang", "Amman", "Bamako", "Vienna", "Prague", "Budapest", "Brussels",
    "Stockholm", "Copenhagen", "Oslo", "Helsinki", "Lisbon", "Athens", "Belgrade",
    "Sofia", "Zagreb", "Sarajevo", "Skopje", "Podgorica", "Ljubljana", "Tirana",
    "Chisinau", "Reykjavik", "Valletta", "Nicosia", "Luxembourg", "Monaco",
    "San Marino", "Andorra la Vella", "Vaduz", "Vatican City", "Suva", "Port Moresby",
    "Honiara", "Apia", "Nukuʻalofa", "Funafuti", "Majuro", "Palikir", "Yaren",
    "Tarawa", "South Tarawa", "Banjul", "Bissau", "Freetown", "Conakry", "Monrovia",
    "Niamey", "Ouagadougou", "Lomé", "Porto-Novo", "Cotonou", "Malabo", "Libreville",
    "Brazzaville", "Bangui", "N'Djamena", "Juba", "Kigali", "Bujumbura",
    "Lilongwe", "Lusaka", "Harare", "Maputo", "Gaborone", "Windhoek", "Maseru",
    "Mbabane", "Lobamba", "Victoria", "Moroni",
    "Nouakchott", "Bamako", "Niamey", "Ouagadougou", "Lomé",
    "Malabo", "Libreville", "Brazzaville", "Bangui", "N'Djamena", "Juba", "Kigali",
    "Bujumbura", "Gitega", "Lilongwe", "Lusaka", "Harare", "Gaborone",
    "Windhoek", "Maseru", "Mbabane", "Lobamba", "Moroni", "Antananarivo",
    "Port Louis"
  ];

  readonly filteredCities = computed(() => {
    const term = this.customerDetails().city.toLowerCase();
    return this.cities.filter(a => a.toLowerCase().includes(term));
  });

  onSubmit(customerForm: NgForm) {
    if (customerForm.valid) {
      this.customerChanged.emit(this.customerDetails());
    }
  }

  firstNameChanged($event: string) {
    this.customerDetails.update(customer => {
      return {
        ...customer,
        firstName: $event
      }
    })
  }

  lastNameChanged($event: string) {
    this.customerDetails.update(customer => {
      return {
        ...customer,
        lastName: $event
      }
    })
  }

  ageChanged($event: string) {
    this.customerDetails.update(customer => {
      return {
        ...customer,
        age: $event
      }
    })
  }

  cityChanged($event: string) {
    this.customerDetails.update(customer => {
      return {
        ...customer,
        city: $event
      }
    })
  }

  countryChanged($event: string) {
    this.customerDetails.update(customer => {
      return {
        ...customer,
        country: $event
      }
    })
  }
}
