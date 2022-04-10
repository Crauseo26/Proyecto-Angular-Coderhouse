import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {StudentService} from "../../../shared/services/student.service";

// TODO: Replace this with your own data model type
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: Date;
  address: string;
  phone: string;
  average: number;
  absences: number;
}

// TODO: replace this with real data from your application
export const STUDENT_DATA: Student[] = [
  {id:1,firstName:"Gaven",lastName:"Weiss",email:"gweiss0@nsw.gov.au",gender:"Male",birthday: new Date("2003-12-01T11:45:57"),address:"37528 Corry Avenue",phone:"+62 214 894 4449",average:93.3,absences:7},
  {id:2,firstName:"Marlyn",lastName:"McDirmid",email:"mmcdirmid1@privacy.gov.au",gender:"Female",birthday: new Date("2001-10-11T01:48:29"),address:"2 Hoepker Terrace",phone:"+86 755 292 3216",average:64.5,absences:6},
  {id:3,firstName:"Kelwin",lastName:"Bew",email:"kbew2@wunderground.com",gender:"Male",birthday: new Date("1981-04-22T23:13:34"),address:"81 Glendale Alley",phone:"+970 938 445 0079",average:83.1,absences:5},
  {id:4,firstName:"Alexio",lastName:"Rebanks",email:"arebanks3@imageshack.us",gender:"Male",birthday: new Date("1974-10-19T10:39:45"),address:"82 Elgar Street",phone:"+504 224 903 3963",average:92.6,absences:5},
  {id:5,firstName:"Audrie",lastName:"Alman",email:"aalman4@gravatar.com",gender:"Female",birthday: new Date("1965-01-31T05:46:56"),address:"67 Ilene Drive",phone:"+63 263 569 9272",average:70.7,absences:4},
  {id:6,firstName:"Drusie",lastName:"Skippen",email:"dskippen5@webmd.com",gender:"Female",birthday: new Date("2001-03-09T23:35:27"),address:"64 Tomscot Circle",phone:"+86 392 229 4581",average:82.6,absences:3},
  {id:7,firstName:"Avrit",lastName:"Hagart",email:"ahagart6@themeforest.net",gender:"Female",birthday: new Date("1976-01-21T09:14:28"),address:"26 Cardinal Crossing",phone:"+86 921 926 4615",average:64.4,absences:4},
  {id:8,firstName:"Gavan",lastName:"Scipsey",email:"gscipsey7@skyrock.com",gender:"Male",birthday: new Date("1996-07-19T23:55:44"),address:"6 Stone Corner Park",phone:"+58 794 174 1057",average:53.6,absences:2},
  {id:9,firstName:"Beale",lastName:"Lysons",email:"blysons8@fotki.com",gender:"Non-binary",birthday: new Date("1965-01-24T01:09:54"),address:"9965 Westport Way",phone:"+1 203 396 2329",average:98.8,absences:6},
  {id:10,firstName:"Tymon",lastName:"Churchard",email:"tchurchard9@mashable.com",gender:"Male",birthday: new Date("1984-10-27T03:22:41"),address:"7412 Lyons Park",phone:"+7 240 872 8786",average:62.2,absences:2},
  {id:11,firstName:"Jed",lastName:"Bellas",email:"jbellasa@dailymail.co.uk",gender:"Male",birthday: new Date("1985-10-14T20:55:30"),address:"021 Artisan Crossing",phone:"+971 261 347 2492",average:88.8,absences:7},
  {id:12,firstName:"Vernice",lastName:"Drydale",email:"vdrydaleb@drupal.org",gender:"Female",birthday: new Date("1985-07-17T11:14:51"),address:"70530 Tony Road",phone:"+381 262 132 3915",average:68.7,absences:7},
  {id:13,firstName:"Katusha",lastName:"Peetermann",email:"kpeetermannc@netscape.com",gender:"Female",birthday: new Date("1990-09-12T22:35:39"),address:"112 Lyons Park",phone:"+86 239 693 8513",average:80.9,absences:4},
  {id:14,firstName:"Sarajane",lastName:"Jeandel",email:"sjeandeld@creativecommons.org",gender:"Female",birthday: new Date("1968-05-03T14:52:46"),address:"91526 Fieldstone Avenue",phone:"+504 196 480 7481",average:84.0,absences:5},
  {id:15,firstName:"Reeva",lastName:"Brokenbrow",email:"rbrokenbrowe@sakura.ne.jp",gender:"Female",birthday: new Date("2000-07-28T01:24:32"),address:"441 Anzinger Drive",phone:"+86 450 874 0978",average:74.3,absences:6},
  {id:16,firstName:"Marylin",lastName:"Sinnat",email:"msinnatf@wunderground.com",gender:"Female",birthday: new Date("1968-12-10T13:13:23"),address:"371 Carberry Parkway",phone:"+7 854 316 4562",average:76.4,absences:3},
  {id:17,firstName:"Sasha",lastName:"Woolgar",email:"swoolgarg@zdnet.com",gender:"Female",birthday: new Date("1975-04-20T00:22:01"),address:"22 Commercial Court",phone:"+62 710 792 0583",average:42.0,absences:7},
  {id:18,firstName:"Parke",lastName:"Twinberrow",email:"ptwinberrowh@vinaora.com",gender:"Male",birthday: new Date("1993-09-12T18:31:02"),address:"8 Fisk Street",phone:"+86 159 160 1555",average:93.9,absences:6},
  {id:19,firstName:"Dannel",lastName:"Chugg",email:"dchuggi@blogtalkradio.com",gender:"Male",birthday: new Date("1961-07-26T23:07:28"),address:"7551 Basil Plaza",phone:"+55 647 914 7305",average:64.6,absences:5},
  {id:20,firstName:"Cher",lastName:"Brunnen",email:"cbrunnenj@moonfruit.com",gender:"Female",birthday: new Date("1968-02-28T13:59:18"),address:"091 Surrey Center",phone:"+385 762 147 2332",average:85.1,absences:7},
  {id:21,firstName:"Dot",lastName:"Bullocke",email:"dbullockek@cdc.gov",gender:"Female",birthday: new Date("1989-07-07T12:30:58"),address:"48231 Clarendon Pass",phone:"+33 705 245 7582",average:72.6,absences:3},
  {id:22,firstName:"Luciano",lastName:"Cramphorn",email:"lcramphornl@toplist.cz",gender:"Male",birthday: new Date("1962-05-22T13:42:31"),address:"8109 Loomis Circle",phone:"+86 379 746 1344",average:93.6,absences:6},
  {id:23,firstName:"Felic",lastName:"Lackner",email:"flacknerm@dailymail.co.uk",gender:"Male",birthday: new Date("1963-06-17T17:25:24"),address:"9537 Gina Lane",phone:"+86 259 287 2570",average:92.1,absences:3},
  {id:24,firstName:"Miriam",lastName:"Sommer",email:"msommern@ucla.edu",gender:"Female",birthday: new Date("1966-06-18T11:03:12"),address:"6 Dovetail Center",phone:"+62 962 906 0527",average:85.7,absences:2},
  {id:25,firstName:"Cooper",lastName:"Boughtflower",email:"cboughtflowero@hc360.com",gender:"Male",birthday: new Date("1996-07-23T01:40:42"),address:"14 Monica Junction",phone:"+20 934 183 7664",average:82.3,absences:1},
  {id:26,firstName:"Torrance",lastName:"Grunnell",email:"tgrunnellp@nyu.edu",gender:"Male",birthday: new Date("2003-02-05T10:58:02"),address:"659 Kim Road",phone:"+62 686 300 9880",average:59.5,absences:6},
  {id:27,firstName:"Shamus",lastName:"McHaffy",email:"smchaffyq@tuttocitta.it",gender:"Male",birthday: new Date("1993-10-22T05:47:27"),address:"75 Katie Circle",phone:"+254 873 859 2632",average:72.7,absences:6},
  {id:28,firstName:"Kurtis",lastName:"Bynert",email:"kbynertr@amazon.de",gender:"Male",birthday: new Date("1975-06-18T09:18:49"),address:"03 Maryland Parkway",phone:"+1 626 997 9140",average:84.6,absences:4},
  {id:29,firstName:"Richard",lastName:"Capoun",email:"rcapouns@cpanel.net",gender:"Male",birthday: new Date("1994-06-26T11:32:03"),address:"9451 Mitchell Road",phone:"+226 539 706 5319",average:78.7,absences:5},
  {id:30,firstName:"Shalne",lastName:"Tunnick",email:"stunnickt@wix.com",gender:"Female",birthday: new Date("1971-08-08T05:52:49"),address:"1888 Parkside Park",phone:"+62 802 445 8036",average:96.3,absences:4},
  {id:31,firstName:"Porter",lastName:"Mallon",email:"pmallonu@time.com",gender:"Male",birthday: new Date("1996-02-11T10:24:31"),address:"447 East Lane",phone:"+86 773 334 9424",average:47.5,absences:6},
  {id:32,firstName:"Aurea",lastName:"Darleston",email:"adarlestonv@un.org",gender:"Female",birthday: new Date("1964-04-08T10:17:16"),address:"7 Pankratz Drive",phone:"+63 599 557 2969",average:59.8,absences:5},
  {id:33,firstName:"Ashlie",lastName:"Aylett",email:"aaylettw@vistaprint.com",gender:"Female",birthday: new Date("1993-01-09T13:23:37"),address:"1085 Golf Course Trail",phone:"+372 551 710 6196",average:65.2,absences:5},
  {id:34,firstName:"Kerry",lastName:"Beall",email:"kbeallx@marriott.com",gender:"Female",birthday: new Date("1991-08-12T18:47:30"),address:"49502 Maryland Crossing",phone:"+7 973 884 3504",average:61.6,absences:3},
  {id:35,firstName:"Fanni",lastName:"Corbert",email:"fcorberty@youtube.com",gender:"Female",birthday: new Date("1967-05-27T08:22:41"),address:"9422 Glacier Hill Way",phone:"+55 146 652 6569",average:49.7,absences:1},
  {id:36,firstName:"Lucius",lastName:"Bartoszewski",email:"lbartoszewskiz@1688.com",gender:"Male",birthday: new Date("1969-06-08T10:21:47"),address:"2434 Lighthouse Bay Street",phone:"+7 983 931 1744",average:58.5,absences:3},
  {id:37,firstName:"Eolande",lastName:"Shivlin",email:"eshivlin10@paginegialle.it",gender:"Female",birthday: new Date("1984-06-21T16:27:09"),address:"717 Fieldstone Hill",phone:"+55 732 487 7413",average:97.4,absences:4},
  {id:38,firstName:"Kyrstin",lastName:"De Ortega",email:"kdeortega11@wufoo.com",gender:"Female",birthday: new Date("1968-02-07T14:45:43"),address:"925 Kropf Crossing",phone:"+7 149 367 4811",average:98.1,absences:7},
  {id:39,firstName:"George",lastName:"Doughton",email:"gdoughton12@xing.com",gender:"Female",birthday: new Date("1995-03-31T21:41:39"),address:"8973 Granby Plaza",phone:"+351 730 755 3349",average:71.7,absences:2},
  {id:40,firstName:"Isa",lastName:"Maben",email:"imaben13@pinterest.com",gender:"Male",birthday: new Date("1986-12-04T19:54:06"),address:"57968 Fairfield Park",phone:"+62 519 231 2261",average:56.6,absences:2},
  {id:41,firstName:"Maurise",lastName:"Allred",email:"mallred14@deliciousdays.com",gender:"Male",birthday: new Date("1967-08-01T10:59:54"),address:"379 Magdeline Center",phone:"+234 641 166 4698",average:93.0,absences:1},
  {id:42,firstName:"Sarette",lastName:"Rosi",email:"srosi15@elegantthemes.com",gender:"Female",birthday: new Date("1984-03-24T22:40:30"),address:"8 Springview Lane",phone:"+269 331 120 1538",average:57.2,absences:3},
  {id:43,firstName:"Nisse",lastName:"De Angelis",email:"ndeangelis16@amazon.co.uk",gender:"Female",birthday: new Date("1971-11-21T20:38:39"),address:"3581 Victoria Circle",phone:"+66 940 874 0185",average:60.2,absences:2},
  {id:44,firstName:"Sisely",lastName:"Armsby",email:"sarmsby17@amazon.co.jp",gender:"Female",birthday: new Date("1980-05-22T15:36:55"),address:"4334 Clyde Gallagher Junction",phone:"+46 188 886 5650",average:93.2,absences:6},
  {id:45,firstName:"Birgitta",lastName:"Ockenden",email:"bockenden18@hp.com",gender:"Female",birthday: new Date("1987-08-14T22:51:16"),address:"5 Marcy Pass",phone:"+33 924 128 4199",average:64.4,absences:3},
  {id:46,firstName:"Aubine",lastName:"Arrell",email:"aarrell19@google.co.uk",gender:"Female",birthday: new Date("2001-04-25T23:16:41"),address:"3730 Green Street",phone:"+7 535 900 1800",average:97.5,absences:2},
  {id:47,firstName:"Courtenay",lastName:"Haslock(e)",email:"chaslocke1a@studiopress.com",gender:"Genderqueer",birthday: new Date("1967-02-08T13:31:58"),address:"011 Eggendart Place",phone:"+261 416 172 2894",average:67.1,absences:1},
  {id:48,firstName:"Angel",lastName:"Greathead",email:"agreathead1b@slashdot.org",gender:"Genderfluid",birthday: new Date("1990-08-04T08:28:15"),address:"2 Cordelia Road",phone:"+62 851 118 0503",average:54.5,absences:4},
  {id:49,firstName:"Muffin",lastName:"Grigorian",email:"mgrigorian1c@360.cn",gender:"Male",birthday: new Date("2000-08-09T00:38:35"),address:"5 Cascade Terrace",phone:"+420 577 295 3981",average:97.9,absences:4},
  {id:50,firstName:"Prudence",lastName:"Beagin",email:"pbeagin1d@usatoday.com",gender:"Female",birthday: new Date("1967-02-12T14:17:37"),address:"33 Vahlen Place",phone:"+504 737 741 4355",average:78.7,absences:7},
  {id:51,firstName:"Earl",lastName:"Lawlings",email:"elawlings1e@studiopress.com",gender:"Male",birthday: new Date("1966-01-04T20:22:10"),address:"57 Namekagon Court",phone:"+380 807 895 5814",average:56.7,absences:6},
  {id:52,firstName:"Omero",lastName:"O' Donohoe",email:"oodonohoe1f@wsj.com",gender:"Male",birthday: new Date("1973-03-04T08:45:22"),address:"63374 Straubel Lane",phone:"+380 738 155 7471",average:49.4,absences:3},
  {id:53,firstName:"Sinclare",lastName:"Errowe",email:"serrowe1g@businesswire.com",gender:"Male",birthday: new Date("1965-12-20T10:51:47"),address:"39958 Kipling Way",phone:"+55 717 505 9820",average:86.0,absences:1},
  {id:54,firstName:"Viva",lastName:"O'Cuddie",email:"vocuddie1h@qq.com",gender:"Female",birthday: new Date("1977-04-30T19:13:30"),address:"07489 Cherokee Street",phone:"+30 422 431 9274",average:92.7,absences:3},
  {id:55,firstName:"Katee",lastName:"Bickerdyke",email:"kbickerdyke1i@oracle.com",gender:"Female",birthday: new Date("1973-07-12T11:03:41"),address:"9 Shopko Center",phone:"+86 781 885 6495",average:95.2,absences:6},
  {id:56,firstName:"Farleigh",lastName:"Doles",email:"fdoles1j@hao123.com",gender:"Male",birthday: new Date("2003-05-22T16:49:04"),address:"9815 Birchwood Lane",phone:"+53 112 191 5793",average:48.2,absences:3},
  {id:57,firstName:"Kippie",lastName:"Rewcassell",email:"krewcassell1k@topsy.com",gender:"Male",birthday: new Date("1961-05-10T21:41:49"),address:"65257 Lien Plaza",phone:"+81 483 927 1076",average:61.0,absences:4},
  {id:58,firstName:"Mollee",lastName:"Narup",email:"mnarup1l@buzzfeed.com",gender:"Female",birthday: new Date("2002-04-14T22:03:33"),address:"243 Merrick Terrace",phone:"+81 114 406 4228",average:96.2,absences:3},
  {id:59,firstName:"Rafaellle",lastName:"Szachniewicz",email:"rszachniewicz1m@rambler.ru",gender:"Non-binary",birthday: new Date("1974-10-06T23:15:43"),address:"06 Huxley Court",phone:"+86 245 629 1337",average:87.7,absences:4},
  {id:60,firstName:"Obidiah",lastName:"Gibbe",email:"ogibbe1n@about.com",gender:"Male",birthday: new Date("2001-01-02T10:22:27"),address:"2 Warrior Parkway",phone:"+48 753 826 9009",average:45.4,absences:5},
  {id:61,firstName:"Harmon",lastName:"Oxnam",email:"hoxnam1o@canalblog.com",gender:"Male",birthday: new Date("1975-07-04T10:18:16"),address:"22516 Warbler Terrace",phone:"+62 602 777 5843",average:55.7,absences:4},
  {id:62,firstName:"Rakel",lastName:"Bracer",email:"rbracer1p@hao123.com",gender:"Female",birthday: new Date("1970-03-06T10:22:35"),address:"12011 Lyons Way",phone:"+63 648 662 3552",average:88.2,absences:3},
  {id:63,firstName:"Julianna",lastName:"Barlow",email:"jbarlow1q@unesco.org",gender:"Female",birthday: new Date("1963-12-10T06:02:10"),address:"385 Comanche Court",phone:"+86 510 810 4568",average:48.1,absences:1},
  {id:64,firstName:"Christiano",lastName:"Gadsby",email:"cgadsby1r@quantcast.com",gender:"Male",birthday: new Date("1980-02-14T11:20:02"),address:"35214 Red Cloud Terrace",phone:"+86 516 145 9505",average:80.2,absences:3},
  {id:65,firstName:"Marya",lastName:"Lydford",email:"mlydford1s@economist.com",gender:"Female",birthday: new Date("1975-03-27T13:02:00"),address:"98823 Crescent Oaks Junction",phone:"+62 721 247 6795",average:49.7,absences:2},
  {id:66,firstName:"Kellen",lastName:"Heber",email:"kheber1t@nymag.com",gender:"Male",birthday: new Date("1963-05-13T05:37:15"),address:"45948 Dawn Place",phone:"+55 531 865 4056",average:54.8,absences:1},
  {id:67,firstName:"Blake",lastName:"Simanek",email:"bsimanek1u@xing.com",gender:"Female",birthday: new Date("1979-01-21T11:07:13"),address:"289 Hoffman Street",phone:"+55 620 524 2228",average:80.8,absences:3},
  {id:68,firstName:"Arabele",lastName:"Birdwhistell",email:"abirdwhistell1v@livejournal.com",gender:"Female",birthday: new Date("1999-02-10T19:03:55"),address:"5214 Marquette Point",phone:"+86 930 168 4809",average:78.1,absences:3},
  {id:69,firstName:"Kristien",lastName:"Beesey",email:"kbeesey1w@google.ru",gender:"Female",birthday: new Date("1974-02-06T10:11:38"),address:"75 Gale Circle",phone:"+53 213 831 3841",average:73.5,absences:3},
  {id:70,firstName:"Onida",lastName:"Bartosiak",email:"obartosiak1x@cisco.com",gender:"Female",birthday: new Date("1988-05-05T08:27:30"),address:"735 Scoville Hill",phone:"+54 535 401 7731",average:49.3,absences:7},
  {id:71,firstName:"Evered",lastName:"Di Matteo",email:"edimatteo1y@g.co",gender:"Male",birthday: new Date("1970-11-20T19:45:20"),address:"234 Clyde Gallagher Lane",phone:"+47 684 390 5226",average:43.8,absences:6},
  {id:72,firstName:"Scarlett",lastName:"Doerrling",email:"sdoerrling1z@meetup.com",gender:"Female",birthday: new Date("1980-12-31T17:54:10"),address:"7 Debs Crossing",phone:"+1 196 603 1171",average:80.0,absences:5},
  {id:73,firstName:"Ileana",lastName:"Faircley",email:"ifaircley20@ifeng.com",gender:"Female",birthday: new Date("1999-02-11T17:01:41"),address:"90704 Longview Pass",phone:"+51 219 933 7833",average:46.3,absences:1},
  {id:74,firstName:"Deena",lastName:"Kilgannon",email:"dkilgannon21@cloudflare.com",gender:"Polygender",birthday: new Date("1967-05-04T02:54:58"),address:"894 Sunnyside Park",phone:"+86 566 240 8817",average:46.0,absences:2},
  {id:75,firstName:"Eustace",lastName:"Hannah",email:"ehannah22@disqus.com",gender:"Polygender",birthday: new Date("2001-08-01T10:40:33"),address:"38736 Marquette Parkway",phone:"+86 698 186 8726",average:86.1,absences:6},
  {id:76,firstName:"Marquita",lastName:"Kendall",email:"mkendall23@redcross.org",gender:"Female",birthday: new Date("1981-04-21T14:00:14"),address:"325 Buhler Court",phone:"+1 233 657 5772",average:53.5,absences:4},
  {id:77,firstName:"Lottie",lastName:"Bussey",email:"lbussey24@ezinearticles.com",gender:"Female",birthday: new Date("1961-07-04T14:35:17"),address:"4321 Mayfield Way",phone:"+46 834 217 4858",average:93.0,absences:5},
  {id:78,firstName:"Farrell",lastName:"Howroyd",email:"fhowroyd25@twitter.com",gender:"Non-binary",birthday: new Date("1967-06-04T18:53:16"),address:"83 West Trail",phone:"+86 651 918 1160",average:98.4,absences:5},
  {id:79,firstName:"Rollins",lastName:"Giorgielli",email:"rgiorgielli26@indiatimes.com",gender:"Male",birthday: new Date("1995-01-16T05:30:44"),address:"0849 Hollow Ridge Center",phone:"+55 275 801 2833",average:94.1,absences:6},
  {id:80,firstName:"Rasia",lastName:"Kirkbride",email:"rkirkbride27@altervista.org",gender:"Bigender",birthday: new Date("1963-10-04T03:40:00"),address:"16837 Texas Terrace",phone:"+86 507 534 0661",average:78.9,absences:2},
  {id:81,firstName:"Deonne",lastName:"Heugel",email:"dheugel28@gmpg.org",gender:"Female",birthday: new Date("1970-02-24T05:45:01"),address:"8 Buell Park",phone:"+377 200 708 5870",average:64.0,absences:1},
  {id:82,firstName:"Astrix",lastName:"Gaveltone",email:"agaveltone29@rakuten.co.jp",gender:"Female",birthday: new Date("1970-11-03T03:57:45"),address:"33 Rieder Way",phone:"+54 456 644 8460",average:94.9,absences:2},
  {id:83,firstName:"Jewelle",lastName:"Riste",email:"jriste2a@upenn.edu",gender:"Female",birthday: new Date("1974-10-26T22:25:12"),address:"7 Portage Park",phone:"+58 527 807 5256",average:85.0,absences:3},
  {id:84,firstName:"Fidelity",lastName:"Kerry",email:"fkerry2b@fema.gov",gender:"Female",birthday: new Date("1977-12-13T06:40:22"),address:"5591 Luster Hill",phone:"+86 884 753 4422",average:78.5,absences:1},
  {id:85,firstName:"Rafaela",lastName:"Lerway",email:"rlerway2c@sohu.com",gender:"Genderfluid",birthday: new Date("1979-07-29T07:10:37"),address:"8326 Miller Road",phone:"+62 257 179 1335",average:65.1,absences:6},
  {id:86,firstName:"Russ",lastName:"MacNeachtain",email:"rmacneachtain2d@cbc.ca",gender:"Male",birthday: new Date("1964-05-20T02:48:32"),address:"18 Fallview Plaza",phone:"+358 389 231 2731",average:72.9,absences:7},
  {id:87,firstName:"Frederic",lastName:"Gettens",email:"fgettens2e@ihg.com",gender:"Male",birthday: new Date("1966-12-30T06:23:18"),address:"25443 Ilene Road",phone:"+63 469 747 8102",average:51.7,absences:6},
  {id:88,firstName:"Stanley",lastName:"Conti",email:"sconti2f@forbes.com",gender:"Male",birthday: new Date("1989-07-09T14:44:22"),address:"39 8th Lane",phone:"+62 402 321 0948",average:89.2,absences:6},
  {id:89,firstName:"Cordelia",lastName:"Mattin",email:"cmattin2g@prweb.com",gender:"Female",birthday: new Date("1966-02-02T06:11:03"),address:"55 Kennedy Trail",phone:"+48 849 517 7158",average:73.2,absences:3},
  {id:90,firstName:"Mel",lastName:"Turfes",email:"mturfes2h@domainmarket.com",gender:"Male",birthday: new Date("1969-07-24T09:02:40"),address:"639 Stephen Hill",phone:"+86 522 548 8834",average:83.8,absences:3},
  {id:91,firstName:"Craggy",lastName:"Frichley",email:"cfrichley2i@pcworld.com",gender:"Male",birthday: new Date("1979-12-31T21:21:32"),address:"11 Eagan Court",phone:"+52 614 467 7441",average:42.2,absences:6},
  {id:92,firstName:"Kelwin",lastName:"Pidler",email:"kpidler2j@nih.gov",gender:"Male",birthday: new Date("1981-08-01T18:12:08"),address:"4 Forest Run Way",phone:"+62 699 577 3374",average:78.1,absences:7},
  {id:93,firstName:"Jemimah",lastName:"Nast",email:"jnast2k@typepad.com",gender:"Female",birthday: new Date("1998-06-03T14:54:49"),address:"6 Browning Avenue",phone:"+30 121 206 7452",average:51.7,absences:1},
  {id:94,firstName:"Feliks",lastName:"Verner",email:"fverner2l@miibeian.gov.cn",gender:"Male",birthday: new Date("1978-04-21T08:52:47"),address:"6 Spohn Alley",phone:"+505 346 908 9461",average:62.5,absences:2},
  {id:95,firstName:"Noelyn",lastName:"Bannard",email:"nbannard2m@phpbb.com",gender:"Female",birthday: new Date("1967-02-22T02:37:21"),address:"2 New Castle Hill",phone:"+52 135 334 4032",average:74.4,absences:2},
  {id:96,firstName:"Gail",lastName:"Hounsham",email:"ghounsham2n@time.com",gender:"Male",birthday: new Date("1966-01-26T13:19:17"),address:"07127 Del Sol Junction",phone:"+7 121 553 2614",average:95.5,absences:3},
  {id:97,firstName:"Darwin",lastName:"Elgey",email:"delgey2o@yellowbook.com",gender:"Male",birthday: new Date("1989-10-14T07:26:05"),address:"36 Petterle Hill",phone:"+86 277 969 7389",average:87.2,absences:2},
  {id:98,firstName:"Isa",lastName:"Duiged",email:"iduiged2p@livejournal.com",gender:"Polygender",birthday: new Date("1990-12-30T11:41:26"),address:"54 Warrior Court",phone:"+86 471 903 9495",average:93.1,absences:6},
  {id:99,firstName:"Adorne",lastName:"Haibel",email:"ahaibel2q@goo.ne.jp",gender:"Non-binary",birthday: new Date("1962-10-03T19:06:59"),address:"2 Northfield Alley",phone:"+420 232 199 6670",average:79.9,absences:5},
  {id:100,firstName:"Ezekiel",lastName:"Fetherstonhaugh",email:"efetherstonhaugh2r@networkadvertising.org",gender:"Male",birthday: new Date("1962-12-24T04:18:58"),address:"8 Ruskin Street",phone:"+386 351 606 9217",average:87.7,absences:7},
  {id:101,firstName:"Geri",lastName:"Willisch",email:"gwillisch2s@gmpg.org",gender:"Polygender",birthday: new Date("1981-11-15T15:57:46"),address:"94 Graedel Park",phone:"+86 333 356 4404",average:72.0,absences:6},
  {id:102,firstName:"Cara",lastName:"Blodget",email:"cblodget2t@youtube.com",gender:"Female",birthday: new Date("1984-02-21T08:00:31"),address:"00067 Hooker Avenue",phone:"+66 911 954 9338",average:47.5,absences:6},
  {id:103,firstName:"Lorant",lastName:"Valadez",email:"lvaladez2u@forbes.com",gender:"Male",birthday: new Date("1977-10-27T16:40:58"),address:"85 Corscot Lane",phone:"+504 437 739 6903",average:82.7,absences:5},
  {id:104,firstName:"Hasty",lastName:"Muzzollo",email:"hmuzzollo2v@meetup.com",gender:"Male",birthday: new Date("1979-07-30T16:09:09"),address:"9083 Lindbergh Street",phone:"+7 663 428 2557",average:56.7,absences:3},
  {id:105,firstName:"Silvana",lastName:"Shitliffe",email:"sshitliffe2w@163.com",gender:"Female",birthday: new Date("1981-06-18T11:10:30"),address:"9 Bunting Road",phone:"+48 688 263 8917",average:59.0,absences:6},
  {id:106,firstName:"Lisbeth",lastName:"Mateo",email:"lmateo2x@omniture.com",gender:"Female",birthday: new Date("1968-08-22T10:42:16"),address:"07380 Lindbergh Point",phone:"+27 253 499 5306",average:79.4,absences:7},
  {id:107,firstName:"Terese",lastName:"Comins",email:"tcomins2y@digg.com",gender:"Female",birthday: new Date("1985-10-05T10:02:28"),address:"557 Prentice Junction",phone:"+257 824 591 8662",average:52.1,absences:4},
  {id:108,firstName:"Elaina",lastName:"Leheude",email:"eleheude2z@yale.edu",gender:"Female",birthday: new Date("1989-06-29T04:21:48"),address:"3225 Vahlen Pass",phone:"+62 268 592 7783",average:55.5,absences:6},
  {id:109,firstName:"Waverley",lastName:"Methuen",email:"wmethuen30@spotify.com",gender:"Male",birthday: new Date("1990-09-21T17:44:30"),address:"36431 Ridgeview Road",phone:"+46 379 959 4231",average:51.8,absences:4},
  {id:110,firstName:"Corinna",lastName:"Tomalin",email:"ctomalin31@ameblo.jp",gender:"Genderfluid",birthday: new Date("1993-09-24T13:54:13"),address:"9509 Stephen Terrace",phone:"+62 729 584 4878",average:84.5,absences:4},
  {id:111,firstName:"Selina",lastName:"Gallymore",email:"sgallymore32@imdb.com",gender:"Female",birthday: new Date("1992-05-14T08:50:40"),address:"017 Loomis Drive",phone:"+62 876 186 1494",average:65.2,absences:4},
  {id:112,firstName:"Jilli",lastName:"Dyhouse",email:"jdyhouse33@blog.com",gender:"Female",birthday: new Date("1990-12-07T02:13:39"),address:"2 Rieder Park",phone:"+63 960 630 0516",average:75.6,absences:4},
  {id:113,firstName:"Somerset",lastName:"Presidey",email:"spresidey34@dropbox.com",gender:"Male",birthday: new Date("1994-12-13T14:41:43"),address:"5387 Brown Court",phone:"+86 588 568 9062",average:86.5,absences:2},
  {id:114,firstName:"Justino",lastName:"Laming",email:"jlaming35@rediff.com",gender:"Male",birthday: new Date("1967-01-06T17:18:52"),address:"7 Portage Road",phone:"+54 446 996 4687",average:83.8,absences:1},
  {id:115,firstName:"Tamera",lastName:"Marcham",email:"tmarcham36@ucsd.edu",gender:"Non-binary",birthday: new Date("1973-12-29T05:33:09"),address:"808 Anthes Place",phone:"+54 503 766 2435",average:67.4,absences:2},
  {id:116,firstName:"Poul",lastName:"Lark",email:"plark37@acquirethisname.com",gender:"Male",birthday: new Date("1992-04-25T20:28:05"),address:"6965 Anderson Alley",phone:"+504 337 446 6938",average:58.3,absences:3},
  {id:117,firstName:"Sully",lastName:"Killen",email:"skillen38@example.com",gender:"Male",birthday: new Date("1977-11-06T17:19:43"),address:"3 Southridge Center",phone:"+46 939 456 9677",average:53.6,absences:5},
  {id:118,firstName:"Rick",lastName:"Doohey",email:"rdoohey39@mit.edu",gender:"Male",birthday: new Date("1969-10-12T06:16:26"),address:"375 Becker Plaza",phone:"+380 655 562 9713",average:40.9,absences:7},
  {id:119,firstName:"Edd",lastName:"Rogier",email:"erogier3a@foxnews.com",gender:"Male",birthday: new Date("1986-11-24T05:49:59"),address:"24589 Summit Plaza",phone:"+359 703 154 3455",average:48.0,absences:5},
  {id:120,firstName:"Kippie",lastName:"Machel",email:"kmachel3b@timesonline.co.uk",gender:"Male",birthday: new Date("1965-05-08T09:20:44"),address:"09005 Killdeer Plaza",phone:"+86 517 852 4635",average:86.4,absences:1},
  {id:121,firstName:"Briny",lastName:"Atchly",email:"batchly3c@sohu.com",gender:"Female",birthday: new Date("1996-03-24T02:38:44"),address:"3474 Derek Crossing",phone:"+86 984 302 6244",average:94.3,absences:1},
  {id:122,firstName:"Carce",lastName:"Fritz",email:"cfritz3d@princeton.edu",gender:"Male",birthday: new Date("1988-01-31T08:15:01"),address:"4 Talisman Plaza",phone:"+98 801 128 3767",average:82.0,absences:5},
  {id:123,firstName:"Euphemia",lastName:"Elfleet",email:"eelfleet3e@sciencedaily.com",gender:"Female",birthday: new Date("1961-02-22T09:34:36"),address:"33288 Grover Trail",phone:"+63 819 171 4986",average:65.8,absences:1},
  {id:124,firstName:"Shawnee",lastName:"Lokier",email:"slokier3f@tinyurl.com",gender:"Female",birthday: new Date("1965-04-14T19:52:57"),address:"02 Summit Place",phone:"+351 481 828 6161",average:57.0,absences:1},
  {id:125,firstName:"Shandeigh",lastName:"Safe",email:"ssafe3g@multiply.com",gender:"Female",birthday: new Date("1968-12-08T14:36:16"),address:"53 Cody Pass",phone:"+81 115 698 7977",average:43.5,absences:6},
  {id:126,firstName:"Adolpho",lastName:"Petrulis",email:"apetrulis3h@craigslist.org",gender:"Male",birthday: new Date("1970-09-18T12:17:08"),address:"0520 Eagan Street",phone:"+55 183 581 6328",average:82.8,absences:6},
  {id:127,firstName:"Lindsay",lastName:"Knudsen",email:"lknudsen3i@ovh.net",gender:"Female",birthday: new Date("1983-10-15T11:11:32"),address:"99994 Prairieview Terrace",phone:"+86 712 901 3419",average:92.4,absences:2},
  {id:128,firstName:"Wendie",lastName:"Postins",email:"wpostins3j@yellowpages.com",gender:"Female",birthday: new Date("1993-11-21T18:17:48"),address:"34 Lien Place",phone:"+58 965 289 2041",average:93.6,absences:1},
  {id:129,firstName:"Tilda",lastName:"Gamil",email:"tgamil3k@wisc.edu",gender:"Female",birthday: new Date("1997-01-28T17:44:05"),address:"84 Rutledge Place",phone:"+62 310 813 1635",average:52.2,absences:7},
  {id:130,firstName:"Fonzie",lastName:"Micheau",email:"fmicheau3l@t-online.de",gender:"Male",birthday: new Date("1980-05-04T02:46:39"),address:"48 Farragut Drive",phone:"+82 995 622 6614",average:83.6,absences:5},
  {id:131,firstName:"Samuele",lastName:"Dibbe",email:"sdibbe3m@pbs.org",gender:"Male",birthday: new Date("1979-02-02T01:40:31"),address:"4 Almo Pass",phone:"+86 624 857 2878",average:78.2,absences:6},
  {id:132,firstName:"Sarina",lastName:"Eyre",email:"seyre3n@java.com",gender:"Female",birthday: new Date("1995-12-22T01:04:30"),address:"519 Veith Parkway",phone:"+86 789 683 9540",average:62.5,absences:5},
  {id:133,firstName:"Darb",lastName:"Chatteris",email:"dchatteris3o@so-net.ne.jp",gender:"Female",birthday: new Date("2000-03-08T13:29:15"),address:"394 Dovetail Terrace",phone:"+351 453 286 3815",average:95.3,absences:5},
  {id:134,firstName:"Alfred",lastName:"Redihough",email:"aredihough3p@cdbaby.com",gender:"Male",birthday: new Date("1986-03-01T20:12:02"),address:"43941 Crescent Oaks Parkway",phone:"+63 934 679 8248",average:66.0,absences:2},
  {id:135,firstName:"Lauritz",lastName:"Ubsdall",email:"lubsdall3q@shop-pro.jp",gender:"Male",birthday: new Date("1972-10-16T07:40:42"),address:"203 Veith Park",phone:"+86 109 564 8703",average:89.0,absences:3},
  {id:136,firstName:"Philippa",lastName:"Petkens",email:"ppetkens3r@sciencedirect.com",gender:"Female",birthday: new Date("2003-11-30T19:07:22"),address:"78642 Hintze Junction",phone:"+691 204 185 1153",average:54.3,absences:4},
  {id:137,firstName:"Andras",lastName:"O' Mahony",email:"aomahony3s@usa.gov",gender:"Male",birthday: new Date("1985-12-20T06:38:35"),address:"28228 Fisk Trail",phone:"+1 323 961 6863",average:46.5,absences:1},
  {id:138,firstName:"Adelaida",lastName:"Scneider",email:"ascneider3t@hibu.com",gender:"Female",birthday: new Date("2003-07-20T12:34:56"),address:"97801 Mcbride Place",phone:"+92 228 476 4708",average:45.8,absences:4},
  {id:139,firstName:"Feodor",lastName:"Dubble",email:"fdubble3u@fastcompany.com",gender:"Male",birthday: new Date("1987-11-07T20:34:37"),address:"84 Scoville Hill",phone:"+56 438 784 9348",average:53.3,absences:6},
  {id:140,firstName:"Gawain",lastName:"Kohter",email:"gkohter3v@miibeian.gov.cn",gender:"Male",birthday: new Date("1977-09-29T09:37:23"),address:"06650 Barby Trail",phone:"+1 202 294 8315",average:75.3,absences:3},
  {id:141,firstName:"Archy",lastName:"Vedeniktov",email:"avedeniktov3w@google.nl",gender:"Male",birthday: new Date("1971-07-12T18:30:28"),address:"71294 Columbus Circle",phone:"+93 399 426 9502",average:79.6,absences:7},
  {id:142,firstName:"Meredeth",lastName:"Wybern",email:"mwybern3x@washingtonpost.com",gender:"Male",birthday: new Date("1964-02-29T03:32:15"),address:"756 Hazelcrest Terrace",phone:"+380 155 964 9348",average:94.9,absences:1},
  {id:143,firstName:"Sayre",lastName:"Dougill",email:"sdougill3y@myspace.com",gender:"Male",birthday: new Date("1961-05-30T02:31:08"),address:"31820 Almo Street",phone:"+504 301 592 1699",average:73.8,absences:7},
  {id:144,firstName:"Illa",lastName:"Guitte",email:"iguitte3z@timesonline.co.uk",gender:"Female",birthday: new Date("1973-01-07T11:35:06"),address:"653 Anzinger Parkway",phone:"+970 770 718 0239",average:72.9,absences:3},
  {id:145,firstName:"Haskell",lastName:"Cregin",email:"hcregin40@goo.gl",gender:"Male",birthday: new Date("2002-07-26T01:08:54"),address:"0 Lotheville Park",phone:"+351 794 681 8781",average:57.9,absences:1},
  {id:146,firstName:"Christiane",lastName:"Franssen",email:"cfranssen41@hugedomains.com",gender:"Female",birthday: new Date("1977-01-29T07:36:17"),address:"1 Hintze Pass",phone:"+62 599 718 5126",average:79.8,absences:7},
  {id:147,firstName:"Tibold",lastName:"Lavelle",email:"tlavelle42@parallels.com",gender:"Male",birthday: new Date("1992-06-12T15:10:06"),address:"82 Mitchell Way",phone:"+351 548 624 4011",average:41.5,absences:3},
  {id:148,firstName:"Tallou",lastName:"Holstein",email:"tholstein43@columbia.edu",gender:"Female",birthday: new Date("1961-07-20T12:29:02"),address:"024 Moose Point",phone:"+55 484 476 3229",average:69.1,absences:4},
  {id:149,firstName:"Turner",lastName:"Gable",email:"tgable44@blogtalkradio.com",gender:"Male",birthday: new Date("1966-09-18T16:14:45"),address:"813 Morning Drive",phone:"+86 140 288 9314",average:59.3,absences:3},
  {id:150,firstName:"Art",lastName:"McSkeagan",email:"amcskeagan45@paypal.com",gender:"Male",birthday: new Date("1968-02-28T21:23:17"),address:"1 Larry Crossing",phone:"+86 818 244 1160",average:43.6,absences:6},
  {id:151,firstName:"Rori",lastName:"Huygen",email:"rhuygen46@howstuffworks.com",gender:"Female",birthday: new Date("1981-11-14T09:40:13"),address:"924 Fairview Avenue",phone:"+351 199 535 0816",average:62.4,absences:4},
  {id:152,firstName:"Putnam",lastName:"Ondrus",email:"pondrus47@prnewswire.com",gender:"Male",birthday: new Date("1985-12-28T17:42:43"),address:"6998 Dakota Terrace",phone:"+55 647 552 1089",average:43.8,absences:4},
  {id:153,firstName:"Amalia",lastName:"Hengoed",email:"ahengoed48@java.com",gender:"Female",birthday: new Date("1990-01-02T07:10:48"),address:"1 Jenifer Crossing",phone:"+31 420 736 2212",average:53.4,absences:7},
  {id:154,firstName:"Malvina",lastName:"Guyot",email:"mguyot49@ibm.com",gender:"Female",birthday: new Date("1988-06-28T02:37:02"),address:"27091 Kropf Center",phone:"+992 787 201 3546",average:56.2,absences:4},
  {id:155,firstName:"Nadine",lastName:"Feenan",email:"nfeenan4a@ted.com",gender:"Female",birthday: new Date("1993-04-19T00:27:42"),address:"190 Loomis Court",phone:"+358 617 924 8827",average:54.9,absences:1},
  {id:156,firstName:"Mike",lastName:"Clemits",email:"mclemits4b@nsw.gov.au",gender:"Genderqueer",birthday: new Date("1978-08-04T03:14:24"),address:"0809 Harbort Hill",phone:"+66 226 303 0241",average:54.5,absences:5},
  {id:157,firstName:"Keary",lastName:"Flecknoe",email:"kflecknoe4c@technorati.com",gender:"Male",birthday: new Date("1990-05-06T20:13:58"),address:"849 Carberry Circle",phone:"+55 605 359 0843",average:90.9,absences:2},
  {id:158,firstName:"Jaquelyn",lastName:"Skeemor",email:"jskeemor4d@mtv.com",gender:"Polygender",birthday: new Date("1978-10-29T01:25:23"),address:"6363 Bonner Circle",phone:"+33 162 966 3463",average:87.2,absences:1},
  {id:159,firstName:"Joaquin",lastName:"Casse",email:"jcasse4e@goodreads.com",gender:"Male",birthday: new Date("1968-06-06T07:11:28"),address:"18 Jenifer Junction",phone:"+86 251 230 7048",average:43.1,absences:6},
  {id:160,firstName:"Poppy",lastName:"Goracci",email:"pgoracci4f@diigo.com",gender:"Female",birthday: new Date("1987-06-04T15:59:57"),address:"17 Upham Terrace",phone:"+86 841 204 8450",average:50.3,absences:1},
  {id:161,firstName:"Ashely",lastName:"Yockney",email:"ayockney4g@pen.io",gender:"Female",birthday: new Date("1988-03-31T03:23:29"),address:"77781 Di Loreto Way",phone:"+7 145 948 8114",average:51.4,absences:6},
  {id:162,firstName:"Leighton",lastName:"Lamacraft",email:"llamacraft4h@51.la",gender:"Male",birthday: new Date("1994-11-09T10:58:32"),address:"7848 Moose Junction",phone:"+1 571 446 7188",average:75.9,absences:2},
  {id:163,firstName:"Roxie",lastName:"Delepine",email:"rdelepine4i@toplist.cz",gender:"Female",birthday: new Date("1992-09-05T13:02:23"),address:"9 Kingsford Trail",phone:"+86 315 953 6203",average:83.9,absences:2},
  {id:164,firstName:"Sydney",lastName:"Beefon",email:"sbeefon4j@dagondesign.com",gender:"Female",birthday: new Date("1987-05-07T09:47:17"),address:"42301 Roxbury Pass",phone:"+380 580 427 9028",average:59.6,absences:3},
  {id:165,firstName:"Marion",lastName:"Waywell",email:"mwaywell4k@admin.ch",gender:"Genderfluid",birthday: new Date("1966-09-08T04:59:07"),address:"295 Division Court",phone:"+356 744 859 3299",average:40.2,absences:4},
  {id:166,firstName:"Lauryn",lastName:"McVicker",email:"lmcvicker4l@npr.org",gender:"Female",birthday: new Date("2001-03-12T18:55:49"),address:"76 Arrowood Crossing",phone:"+63 313 384 4714",average:58.2,absences:2},
  {id:167,firstName:"Buck",lastName:"Penley",email:"bpenley4m@acquirethisname.com",gender:"Male",birthday: new Date("1986-04-22T10:16:38"),address:"3204 Manley Road",phone:"+420 743 770 1900",average:89.7,absences:6},
  {id:168,firstName:"Kienan",lastName:"Muxworthy",email:"kmuxworthy4n@examiner.com",gender:"Male",birthday: new Date("2001-03-20T11:14:18"),address:"6 Eggendart Circle",phone:"+57 988 287 5403",average:41.2,absences:7},
  {id:169,firstName:"Fair",lastName:"Osinin",email:"fosinin4o@homestead.com",gender:"Male",birthday: new Date("1983-02-21T13:49:59"),address:"3 Cottonwood Way",phone:"+358 653 204 2903",average:61.7,absences:3},
  {id:170,firstName:"Bert",lastName:"Cheeld",email:"bcheeld4p@i2i.jp",gender:"Male",birthday: new Date("1983-03-04T23:00:44"),address:"11 Elgar Street",phone:"+54 676 108 7957",average:85.3,absences:4},
  {id:171,firstName:"Bale",lastName:"Slowley",email:"bslowley4q@symantec.com",gender:"Male",birthday: new Date("1989-05-12T08:03:37"),address:"83 Anhalt Drive",phone:"+386 608 959 4370",average:60.8,absences:6},
  {id:172,firstName:"Forrester",lastName:"Canto",email:"fcanto4r@digg.com",gender:"Male",birthday: new Date("1978-06-17T13:53:24"),address:"32 Toban Plaza",phone:"+48 722 678 6995",average:48.6,absences:2},
  {id:173,firstName:"Harriot",lastName:"Ettridge",email:"hettridge4s@artisteer.com",gender:"Female",birthday: new Date("1967-05-12T14:24:36"),address:"0 Lindbergh Drive",phone:"+62 397 640 6535",average:44.6,absences:2},
  {id:174,firstName:"Ward",lastName:"Hedgecock",email:"whedgecock4t@loc.gov",gender:"Male",birthday: new Date("1974-09-17T15:53:20"),address:"99 Fairview Street",phone:"+55 461 357 4503",average:61.1,absences:3},
  {id:175,firstName:"Flinn",lastName:"Semered",email:"fsemered4u@xinhuanet.com",gender:"Male",birthday: new Date("2002-03-31T05:10:47"),address:"06626 Dunning Hill",phone:"+81 357 931 1938",average:59.2,absences:3},
  {id:176,firstName:"Kanya",lastName:"Hamstead",email:"khamstead4v@list-manage.com",gender:"Female",birthday: new Date("2003-10-15T03:35:42"),address:"146 Oak Trail",phone:"+886 844 295 0047",average:88.9,absences:5},
  {id:177,firstName:"Greggory",lastName:"Grayling",email:"ggrayling4w@wordpress.org",gender:"Male",birthday: new Date("1972-03-15T23:19:43"),address:"2151 Meadow Ridge Plaza",phone:"+598 231 926 8119",average:79.1,absences:2},
  {id:178,firstName:"Paulo",lastName:"Glantz",email:"pglantz4x@illinois.edu",gender:"Male",birthday: new Date("1988-06-20T16:04:55"),address:"60 Ilene Drive",phone:"+47 269 342 3496",average:98.7,absences:7},
  {id:179,firstName:"Devina",lastName:"Rousel",email:"drousel4y@artisteer.com",gender:"Female",birthday: new Date("1988-12-11T17:35:14"),address:"7812 Katie Plaza",phone:"+387 230 472 9533",average:75.6,absences:5},
  {id:180,firstName:"Elke",lastName:"Malham",email:"emalham4z@hugedomains.com",gender:"Female",birthday: new Date("1971-09-14T09:35:49"),address:"60852 Meadow Valley Road",phone:"+7 358 581 9058",average:97.0,absences:3},
  {id:181,firstName:"Shepard",lastName:"Catt",email:"scatt50@de.vu",gender:"Male",birthday: new Date("1982-11-15T01:26:31"),address:"306 Barby Hill",phone:"+506 643 461 8757",average:90.3,absences:5},
  {id:182,firstName:"Chalmers",lastName:"Callum",email:"ccallum51@mtv.com",gender:"Male",birthday: new Date("1979-05-14T14:06:56"),address:"6 Milwaukee Alley",phone:"+62 859 898 6402",average:93.1,absences:5},
  {id:183,firstName:"Johanna",lastName:"Sach",email:"jsach52@ask.com",gender:"Female",birthday: new Date("1979-04-20T09:37:36"),address:"77591 Troy Junction",phone:"+33 259 841 2937",average:76.0,absences:1},
  {id:184,firstName:"Marybelle",lastName:"Escalera",email:"mescalera53@howstuffworks.com",gender:"Female",birthday: new Date("1970-10-25T17:01:54"),address:"4186 Spaight Terrace",phone:"+358 862 591 2399",average:83.0,absences:3},
  {id:185,firstName:"Sal",lastName:"Seiffert",email:"sseiffert54@google.com.hk",gender:"Female",birthday: new Date("1986-09-05T23:59:32"),address:"7372 Spaight Avenue",phone:"+86 688 293 5143",average:73.6,absences:7},
  {id:186,firstName:"Caritta",lastName:"Eakins",email:"ceakins55@omniture.com",gender:"Female",birthday: new Date("1973-02-07T06:54:04"),address:"4 Kinsman Plaza",phone:"+86 541 450 9732",average:67.1,absences:7},
  {id:187,firstName:"Denyse",lastName:"Gozzard",email:"dgozzard56@harvard.edu",gender:"Female",birthday: new Date("1993-06-23T20:40:25"),address:"591 Mosinee Street",phone:"+507 323 266 0286",average:41.2,absences:6},
  {id:188,firstName:"Tyne",lastName:"Fahey",email:"tfahey57@japanpost.jp",gender:"Female",birthday: new Date("1980-05-24T21:32:35"),address:"76 Welch Pass",phone:"+48 292 648 3484",average:43.3,absences:2},
  {id:189,firstName:"Keir",lastName:"Kuzma",email:"kkuzma58@yandex.ru",gender:"Male",birthday: new Date("1991-03-05T17:33:50"),address:"38 Katie Place",phone:"+506 684 825 6777",average:52.2,absences:1},
  {id:190,firstName:"Kerwin",lastName:"Gilhooley",email:"kgilhooley59@addthis.com",gender:"Non-binary",birthday: new Date("1960-10-21T13:00:53"),address:"65415 Westport Parkway",phone:"+386 569 448 3198",average:75.8,absences:1},
  {id:191,firstName:"Lynelle",lastName:"Atty",email:"latty5a@nasa.gov",gender:"Female",birthday: new Date("1982-12-13T13:31:01"),address:"352 Randy Circle",phone:"+81 385 514 3141",average:84.9,absences:2},
  {id:192,firstName:"Aloise",lastName:"Maw",email:"amaw5b@meetup.com",gender:"Female",birthday: new Date("1979-09-03T02:43:34"),address:"88266 Shelley Place",phone:"+351 276 590 7647",average:79.2,absences:3},
  {id:193,firstName:"Cheston",lastName:"Spradbery",email:"cspradbery5c@so-net.ne.jp",gender:"Male",birthday: new Date("1961-10-31T16:29:33"),address:"339 Starling Trail",phone:"+62 289 467 4613",average:73.9,absences:5},
  {id:194,firstName:"Brigida",lastName:"Calver",email:"bcalver5d@arizona.edu",gender:"Female",birthday: new Date("1970-06-21T13:38:04"),address:"0 Dixon Terrace",phone:"+86 860 367 4609",average:78.7,absences:1},
  {id:195,firstName:"Vikky",lastName:"McKenny",email:"vmckenny5e@archive.org",gender:"Female",birthday: new Date("1981-01-19T16:35:05"),address:"4723 Birchwood Drive",phone:"+358 932 723 1159",average:47.1,absences:7},
  {id:196,firstName:"Nollie",lastName:"Barritt",email:"nbarritt5f@disqus.com",gender:"Female",birthday: new Date("1983-11-04T13:17:49"),address:"50 Huxley Point",phone:"+86 765 425 0352",average:81.1,absences:4},
  {id:197,firstName:"Clemente",lastName:"Longo",email:"clongo5g@dmoz.org",gender:"Male",birthday: new Date("1977-01-05T22:57:39"),address:"2824 Amoth Park",phone:"+86 379 824 7611",average:88.2,absences:7},
  {id:198,firstName:"Edin",lastName:"O'Donohue",email:"eodonohue5h@telegraph.co.uk",gender:"Female",birthday: new Date("1972-02-23T02:20:19"),address:"71 Bay Parkway",phone:"+63 493 818 2151",average:46.8,absences:2},
  {id:199,firstName:"Ayn",lastName:"Matieu",email:"amatieu5i@google.ca",gender:"Female",birthday: new Date("1993-06-21T12:00:18"),address:"99 Scoville Lane",phone:"+62 739 169 3502",average:68.3,absences:5},
  {id:200,firstName:"Taber",lastName:"Glede",email:"tglede5j@nytimes.com",gender:"Male",birthday: new Date("1972-12-09T10:08:15"),address:"4010 Sauthoff Court",phone:"+45 982 353 6560",average:67.0,absences:7},
  {id:201,firstName:"Gale",lastName:"Bartaloni",email:"gbartaloni5k@list-manage.com",gender:"Male",birthday: new Date("1990-04-23T10:02:15"),address:"33 Warbler Drive",phone:"+62 473 233 3724",average:52.0,absences:4},
  {id:202,firstName:"Odie",lastName:"Castiglio",email:"ocastiglio5l@spotify.com",gender:"Male",birthday: new Date("1990-07-21T23:51:42"),address:"27700 Rusk Road",phone:"+86 925 573 2906",average:56.8,absences:5},
  {id:203,firstName:"Jilli",lastName:"Alvey",email:"jalvey5m@xing.com",gender:"Female",birthday: new Date("1997-05-18T02:00:28"),address:"60379 Dahle Avenue",phone:"+33 413 231 3842",average:77.8,absences:7},
  {id:204,firstName:"Nydia",lastName:"Dalliwatr",email:"ndalliwatr5n@photobucket.com",gender:"Female",birthday: new Date("2000-01-31T09:01:57"),address:"80187 Briar Crest Parkway",phone:"+380 940 874 4736",average:61.0,absences:1},
  {id:205,firstName:"Georgianne",lastName:"Eborn",email:"geborn5o@weather.com",gender:"Female",birthday: new Date("1989-03-27T20:25:20"),address:"0 Westport Alley",phone:"+48 382 320 7544",average:44.1,absences:6},
  {id:206,firstName:"Kalle",lastName:"Akred",email:"kakred5p@salon.com",gender:"Male",birthday: new Date("1990-09-02T00:54:43"),address:"4757 Sunbrook Street",phone:"+62 780 126 0591",average:53.5,absences:4},
  {id:207,firstName:"Silvana",lastName:"Dysart",email:"sdysart5q@google.ca",gender:"Female",birthday: new Date("1992-07-22T01:41:11"),address:"61 Karstens Street",phone:"+86 365 166 7700",average:77.8,absences:4},
  {id:208,firstName:"Micheal",lastName:"Allmark",email:"mallmark5r@com.com",gender:"Male",birthday: new Date("1974-08-09T10:37:23"),address:"9 Algoma Crossing",phone:"+370 104 332 0438",average:51.1,absences:4},
  {id:209,firstName:"Martyn",lastName:"Lotze",email:"mlotze5s@narod.ru",gender:"Male",birthday: new Date("1967-09-07T05:40:00"),address:"941 Vidon Street",phone:"+234 805 813 4663",average:42.2,absences:4},
  {id:210,firstName:"Torey",lastName:"Garaway",email:"tgaraway5t@networkadvertising.org",gender:"Male",birthday: new Date("1962-12-27T18:48:03"),address:"282 Roxbury Pass",phone:"+967 693 121 6310",average:79.7,absences:3},
  {id:211,firstName:"Isadora",lastName:"Pilsbury",email:"ipilsbury5u@yahoo.co.jp",gender:"Female",birthday: new Date("1999-07-07T08:52:36"),address:"867 Welch Road",phone:"+86 302 840 2291",average:97.1,absences:2},
  {id:212,firstName:"Eliza",lastName:"Qualtro",email:"equaltro5v@loc.gov",gender:"Female",birthday: new Date("1998-01-13T10:43:55"),address:"7 Schurz Avenue",phone:"+33 473 562 7825",average:63.9,absences:5},
  {id:213,firstName:"Lek",lastName:"Hunnaball",email:"lhunnaball5w@smugmug.com",gender:"Male",birthday: new Date("1973-08-24T13:11:51"),address:"66 Coleman Drive",phone:"+86 991 809 5098",average:56.8,absences:4},
  {id:214,firstName:"Ernie",lastName:"Pipet",email:"epipet5x@ft.com",gender:"Male",birthday: new Date("1986-11-21T12:49:21"),address:"1 Onsgard Place",phone:"+62 320 289 5800",average:82.3,absences:7},
  {id:215,firstName:"Wilden",lastName:"Linskey",email:"wlinskey5y@patch.com",gender:"Male",birthday: new Date("1979-06-24T05:09:46"),address:"183 Continental Hill",phone:"+7 720 235 8244",average:53.4,absences:6},
  {id:216,firstName:"Merilyn",lastName:"Ryman",email:"mryman5z@slate.com",gender:"Female",birthday: new Date("1996-10-05T05:15:50"),address:"75247 Mallard Plaza",phone:"+504 623 404 0067",average:71.3,absences:6},
  {id:217,firstName:"Charita",lastName:"Questier",email:"cquestier60@github.io",gender:"Female",birthday: new Date("1976-09-20T01:02:09"),address:"61709 Forest Run Plaza",phone:"+1 801 625 8631",average:78.0,absences:6},
  {id:218,firstName:"Lindsay",lastName:"Itzkovici",email:"litzkovici61@acquirethisname.com",gender:"Female",birthday: new Date("1977-05-16T03:54:38"),address:"57 Carey Crossing",phone:"+7 913 720 2572",average:76.4,absences:7},
  {id:219,firstName:"Nobie",lastName:"Troubridge",email:"ntroubridge62@geocities.jp",gender:"Male",birthday: new Date("1977-07-27T02:55:41"),address:"7 Paget Hill",phone:"+33 354 441 5756",average:54.6,absences:1},
  {id:220,firstName:"Daria",lastName:"D'Alessandro",email:"ddalessandro63@sina.com.cn",gender:"Female",birthday: new Date("1973-02-25T03:26:49"),address:"19 Myrtle Park",phone:"+235 972 613 1443",average:76.9,absences:1},
  {id:221,firstName:"Cassius",lastName:"Lartice",email:"clartice64@blogger.com",gender:"Male",birthday: new Date("1960-03-16T03:57:14"),address:"1 Main Place",phone:"+970 345 763 6789",average:85.4,absences:5},
  {id:222,firstName:"Stevena",lastName:"Perdue",email:"sperdue65@nature.com",gender:"Female",birthday: new Date("1961-02-15T06:29:40"),address:"72 Summerview Way",phone:"+351 651 140 3610",average:59.7,absences:7},
  {id:223,firstName:"Morie",lastName:"Jeanneau",email:"mjeanneau66@cisco.com",gender:"Genderfluid",birthday: new Date("1996-11-27T23:08:15"),address:"8 Briar Crest Point",phone:"+62 892 697 1246",average:45.5,absences:5},
  {id:224,firstName:"Delmar",lastName:"Spellworth",email:"dspellworth67@pinterest.com",gender:"Male",birthday: new Date("1988-06-11T23:23:06"),address:"916 Manufacturers Park",phone:"+86 848 879 7313",average:41.4,absences:1},
  {id:225,firstName:"Giusto",lastName:"Birtley",email:"gbirtley68@youku.com",gender:"Male",birthday: new Date("1999-11-24T08:14:22"),address:"9737 Coolidge Place",phone:"+66 212 581 1786",average:73.6,absences:5},
  {id:226,firstName:"Parry",lastName:"Laroze",email:"plaroze69@xing.com",gender:"Non-binary",birthday: new Date("1982-02-04T15:05:15"),address:"615 Veith Circle",phone:"+358 285 401 2804",average:98.7,absences:7},
  {id:227,firstName:"Herman",lastName:"Gurrado",email:"hgurrado6a@google.ca",gender:"Male",birthday: new Date("1992-06-04T09:15:16"),address:"6825 Ohio Circle",phone:"+375 892 698 4829",average:80.2,absences:1},
  {id:228,firstName:"Zollie",lastName:"Shedd",email:"zshedd6b@360.cn",gender:"Male",birthday: new Date("1996-11-23T20:26:23"),address:"78 Butternut Terrace",phone:"+7 138 818 3962",average:68.3,absences:5},
  {id:229,firstName:"Wheeler",lastName:"Kempston",email:"wkempston6c@acquirethisname.com",gender:"Male",birthday: new Date("1998-01-21T05:12:34"),address:"8627 Mockingbird Court",phone:"+7 658 319 8868",average:85.1,absences:1},
  {id:230,firstName:"Riva",lastName:"McClaughlin",email:"rmcclaughlin6d@discovery.com",gender:"Female",birthday: new Date("1968-03-06T23:15:11"),address:"2451 Coleman Alley",phone:"+86 708 962 2507",average:77.9,absences:6},
  {id:231,firstName:"Claudius",lastName:"Vickors",email:"cvickors6e@photobucket.com",gender:"Male",birthday: new Date("1988-12-17T04:59:43"),address:"11 Ridgeway Junction",phone:"+86 529 381 0642",average:89.6,absences:6},
  {id:232,firstName:"Eleanor",lastName:"Foynes",email:"efoynes6f@timesonline.co.uk",gender:"Female",birthday: new Date("1960-06-22T05:41:09"),address:"47064 Schurz Center",phone:"+351 637 426 1425",average:84.8,absences:6},
  {id:233,firstName:"Ellwood",lastName:"Bartens",email:"ebartens6g@eventbrite.com",gender:"Non-binary",birthday: new Date("1971-04-02T03:11:50"),address:"9142 Farragut Place",phone:"+46 645 116 8126",average:81.0,absences:7},
  {id:234,firstName:"Igor",lastName:"Shuttell",email:"ishuttell6h@privacy.gov.au",gender:"Male",birthday: new Date("1996-08-07T12:11:26"),address:"73010 4th Hill",phone:"+62 321 178 4137",average:63.3,absences:1},
  {id:235,firstName:"Carney",lastName:"Bech",email:"cbech6i@free.fr",gender:"Male",birthday: new Date("1976-08-12T05:32:33"),address:"08179 Eagan Alley",phone:"+63 983 217 6132",average:44.4,absences:2},
  {id:236,firstName:"Rockey",lastName:"Lawrenceson",email:"rlawrenceson6j@drupal.org",gender:"Genderqueer",birthday: new Date("2002-07-25T22:43:46"),address:"5 Milwaukee Trail",phone:"+46 986 706 7654",average:91.1,absences:5},
  {id:237,firstName:"Lynea",lastName:"Shuttell",email:"lshuttell6k@cam.ac.uk",gender:"Female",birthday: new Date("1972-03-02T03:11:22"),address:"68 Novick Circle",phone:"+30 494 442 6449",average:67.4,absences:3},
  {id:238,firstName:"Helen-elizabeth",lastName:"Kyteley",email:"hkyteley6l@is.gd",gender:"Female",birthday: new Date("1975-02-15T03:09:35"),address:"70276 Hagan Street",phone:"+86 540 198 2206",average:45.8,absences:2},
  {id:239,firstName:"Terrell",lastName:"Danes",email:"tdanes6m@unesco.org",gender:"Male",birthday: new Date("1980-06-07T15:17:36"),address:"304 Blackbird Court",phone:"+98 637 730 7674",average:91.9,absences:5},
  {id:240,firstName:"Dean",lastName:"McNerlin",email:"dmcnerlin6n@about.me",gender:"Male",birthday: new Date("1988-07-26T04:02:14"),address:"1322 North Road",phone:"+63 478 433 3728",average:91.5,absences:4},
  {id:241,firstName:"Zsazsa",lastName:"Lock",email:"zlock6o@php.net",gender:"Female",birthday: new Date("1963-12-02T05:57:27"),address:"35 Nevada Point",phone:"+86 936 540 6736",average:81.6,absences:4},
  {id:242,firstName:"Wernher",lastName:"Bode",email:"wbode6p@princeton.edu",gender:"Male",birthday: new Date("1962-01-10T12:21:39"),address:"630 Troy Park",phone:"+62 647 929 4005",average:67.6,absences:3},
  {id:243,firstName:"Miof mela",lastName:"Tease",email:"mtease6q@ow.ly",gender:"Female",birthday: new Date("1997-01-13T16:44:40"),address:"54 Moland Terrace",phone:"+33 286 491 6725",average:89.9,absences:3},
  {id:244,firstName:"Jandy",lastName:"Martinello",email:"jmartinello6r@prweb.com",gender:"Female",birthday: new Date("1986-01-22T22:00:37"),address:"544 Walton Terrace",phone:"+86 585 839 1224",average:80.6,absences:6},
  {id:245,firstName:"Greg",lastName:"Cobden",email:"gcobden6s@51.la",gender:"Male",birthday: new Date("1966-06-28T18:30:08"),address:"70 Sutherland Crossing",phone:"+256 379 331 3161",average:92.6,absences:7},
  {id:246,firstName:"Jobey",lastName:"Mellsop",email:"jmellsop6t@discovery.com",gender:"Genderqueer",birthday: new Date("1983-11-21T03:16:20"),address:"31736 Everett Trail",phone:"+86 500 302 2365",average:48.8,absences:4},
  {id:247,firstName:"Artair",lastName:"Olivet",email:"aolivet6u@rakuten.co.jp",gender:"Male",birthday: new Date("1971-08-27T17:00:29"),address:"20 Ridgeview Crossing",phone:"+966 734 831 7137",average:57.8,absences:6},
  {id:248,firstName:"Korrie",lastName:"Ferraron",email:"kferraron6v@pbs.org",gender:"Female",birthday: new Date("1985-07-04T20:31:32"),address:"1825 Main Hill",phone:"+86 218 561 2899",average:98.9,absences:1},
  {id:249,firstName:"Antonius",lastName:"Salvadori",email:"asalvadori6w@unicef.org",gender:"Male",birthday: new Date("2001-04-15T21:55:57"),address:"66202 Doe Crossing Plaza",phone:"+63 591 570 8544",average:61.1,absences:2},
  {id:250,firstName:"Michele",lastName:"Faveryear",email:"mfaveryear6x@diigo.com",gender:"Female",birthday: new Date("1989-06-30T04:25:12"),address:"604 Corscot Road",phone:"+27 322 537 8336",average:66.4,absences:4}
];

/**
 * Data source for the ExampleTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentsDataSource extends DataSource<Student> {
  data!: Student[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private studentService: StudentService) {
    super();
    this.studentService.students.subscribe(response => {
      this.data = response
    })
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Student[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Student[]): Student[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Student[]): Student[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'fullName': return compare(a.firstName.concat(a.lastName), b.firstName.concat(b.lastName), isAsc);
        case 'average': return compare(a.average, b.average, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
