import React, { useState, useMemo } from 'react';

// ─── REAL PMPL DATA from official schedule PDF ─────────────────────────────
const ROUTES = [
  // ── CORE CITY ROUTES ──
  { no:'1',    from:'Marketyard',        to:'Pimpalegurav',          via:'Swargate, Deccan, Shivajinagar',        freq:'Every 10 min', firstUp:'5:05AM', lastUp:'10:50PM', firstDn:'6:55AM', lastDn:'10:40PM', fare:20, type:'regular' },
  { no:'2',    from:'Katraj',            to:'Shivajinagar',          via:'Swargate, Deccan',                       freq:'Every 8 min',  firstUp:'5:20AM', lastUp:'10:30PM', firstDn:'6:15AM', lastDn:'11:30PM', fare:18, type:'regular' },
  { no:'2A',   from:'Katraj',            to:'Shivajinagar',          via:'Swargate, Sahkar Nagar',                freq:'Every 12 min', firstUp:'5:10AM', lastUp:'8:20PM',  firstDn:'6:10AM', lastDn:'9:00PM',  fare:18, type:'regular' },
  { no:'4',    from:'Pune Station',      to:'Kothrud',               via:'Deccan, Karve Road',                    freq:'Every 8 min',  firstUp:'5:00AM', lastUp:'10:10PM', firstDn:'6:25AM', lastDn:'10:50PM', fare:20, type:'regular' },
  { no:'8',    from:'Swargate',          to:'Sahkar Nagar',          via:'Bibewadi',                              freq:'Every 15 min', firstUp:'5:05AM', lastUp:'9:30PM',  firstDn:'6:40AM', lastDn:'10:10PM', fare:15, type:'regular' },
  { no:'11',   from:'Marketyard',        to:'Pimpalegurav',          via:'Shivajinagar',                          freq:'Every 10 min', firstUp:'5:20AM', lastUp:'10:50PM', firstDn:'6:15AM', lastDn:'11:30PM', fare:18, type:'regular' },
  { no:'11A',  from:'Marketyard',        to:'Kasarwadi Station',     via:'Shivajinagar',                          freq:'4 trips',      firstUp:'6:30AM', lastUp:'5:40PM',  firstDn:'7:45AM', lastDn:'5:10PM',  fare:16, type:'regular' },
  { no:'11K',  from:'Katraj',            to:'Pimple Gurav',          via:'Deccan, Shivajinagar',                  freq:'Every 15 min', firstUp:'5:25AM', lastUp:'7:50PM',  firstDn:'6:25AM', lastDn:'9:45PM',  fare:22, type:'regular' },
  { no:'12',   from:'Upper Depo',        to:'Shivaji Nagar',         via:'Karve Road, Deccan',                    freq:'Every 12 min', firstUp:'5:10AM', lastUp:'10:30PM', firstDn:'6:15AM', lastDn:'11:50PM', fare:16, type:'regular' },
  { no:'13',   from:'Upper Depo',        to:'Shivajinagar',          via:'Kothrud, Deccan',                       freq:'Every 12 min', firstUp:'5:10AM', lastUp:'7:50AM',  firstDn:'6:00AM', lastDn:'9:00AM',  fare:16, type:'regular' },
  { no:'15',   from:'Swargate',          to:'Narhegaon',             via:'Bibewadi, Ambegaon',                    freq:'Every 15 min', firstUp:'5:00AM', lastUp:'9:45PM',  firstDn:'6:00AM', lastDn:'10:40PM', fare:18, type:'regular' },
  { no:'17',   from:'Shewalewadi',       to:'Dhayari DSK Vishwa',    via:'Ambegaon',                              freq:'Every 20 min', firstUp:'5:20AM', lastUp:'10:05PM', firstDn:'6:05AM', lastDn:'10:35PM', fare:15, type:'regular' },
  { no:'18',   from:'Swargate',          to:'Alandi',                via:'Shivajinagar, Dapodi',                  freq:'Every 40 min', firstUp:'5:05AM', lastUp:'8:30PM',  firstDn:'6:15AM', lastDn:'9:30PM',  fare:35, type:'regular' },
  { no:'19',   from:'Swargate',          to:'Yewalewadi',            via:'Kondhwa',                               freq:'Every 20 min', firstUp:'5:00AM', lastUp:'9:45PM',  firstDn:'6:00AM', lastDn:'10:15PM', fare:18, type:'regular' },
  { no:'19A',  from:'Swargate',          to:'Yewalewadi (Kakade)',   via:'Kondhwa, Kakade Wasti',                 freq:'Every 25 min', firstUp:'5:00AM', lastUp:'9:45PM',  firstDn:'6:00AM', lastDn:'10:15PM', fare:18, type:'regular' },
  { no:'21',   from:'Swargate',          to:'Sangvi',                via:'Deccan, Shivajinagar',                  freq:'Every 20 min', firstUp:'5:15AM', lastUp:'10:10PM', firstDn:'6:20AM', lastDn:'10:35PM', fare:22, type:'regular' },
  { no:'22',   from:'Swargate',          to:'Dehugaon',              via:'Deccan, Bhandara Dongar',               freq:'6 trips',      firstUp:'6:00AM', lastUp:'6:30PM',  firstDn:'8:35AM', lastDn:'7:30PM',  fare:40, type:'regular' },
  { no:'24',   from:'Katraj',            to:'Samata Nagar',          via:'Bibewadi',                              freq:'Every 30 min', firstUp:'5:10AM', lastUp:'10:45PM', firstDn:'5:00AM', lastDn:'10:25PM', fare:20, type:'regular' },
  { no:'24A',  from:'Katraj',            to:'Lohegaon',              via:'Swargate, Hadapsar, Ramwadi',           freq:'Every 40 min', firstUp:'5:30AM', lastUp:'10:45PM', firstDn:'5:10AM', lastDn:'10:45PM', fare:30, type:'regular' },
  { no:'26',   from:'Shivaji Nagar',     to:'Dhankawadi',            via:'Swargate, Bibewadi',                    freq:'Every 15 min', firstUp:'5:00AM', lastUp:'9:00PM',  firstDn:'6:40AM', lastDn:'9:45PM',  fare:18, type:'regular' },
  { no:'27',   from:'Shivaji Nagar',     to:'Bharati Vidyapith',     via:'Kothrud, Karve Road',                   freq:'Every 30 min', firstUp:'5:30AM', lastUp:'8:50PM',  firstDn:'6:00AM', lastDn:'9:30PM',  fare:20, type:'regular' },
  { no:'29',   from:'Ghotawade Phata',   to:'Marketyard',            via:'Katraj',                                freq:'Every 25 min', firstUp:'4:45AM', lastUp:'9:35PM',  firstDn:'6:30AM', lastDn:'10:20PM', fare:25, type:'regular' },
  { no:'30',   from:'Sangvi',            to:'Swargate',              via:'Shivajinagar, Deccan',                  freq:'Every 20 min', firstUp:'5:30AM', lastUp:'9:50PM',  firstDn:'6:00AM', lastDn:'10:20PM', fare:20, type:'regular' },
  { no:'34',   from:'Aundhgaon',         to:'Nigdi Pawale Chowk',    via:'Baner, Wakad',                          freq:'5 trips',      firstUp:'7:30AM', lastUp:'6:20PM',  firstDn:'8:30AM', lastDn:'7:30PM',  fare:22, type:'regular' },
  { no:'35',   from:'Manapa',            to:'Mukai Kiwale',          via:'Wakad, Pimpri',                         freq:'8 trips',      firstUp:'6:15AM', lastUp:'6:20PM',  firstDn:'7:20AM', lastDn:'10:15PM', fare:22, type:'regular' },
  { no:'37',   from:'Natawadi',          to:'Sahakarnagar',          via:'Swargate',                              freq:'2 trips',      firstUp:'6:10AM', lastUp:'2:20PM',  firstDn:'1:30PM', lastDn:'9:50PM',  fare:18, type:'regular' },
  { no:'38',   from:'Natawadi',          to:'Dhankawadi',            via:'Swargate, Kondhwa',                     freq:'Every 25 min', firstUp:'5:50AM', lastUp:'10:00PM', firstDn:'6:40AM', lastDn:'11:00PM', fare:22, type:'regular' },
  { no:'39',   from:'Pune Station',      to:'Dhankawadi',            via:'Swargate, Bibewadi',                    freq:'Every 30 min', firstUp:'6:00AM', lastUp:'8:25PM',  firstDn:'6:45AM', lastDn:'9:55PM',  fare:20, type:'regular' },
  { no:'42',   from:'Katraj',            to:'Nigdi',                 via:'Deccan, Shivajinagar, Pimpri',          freq:'Every 20 min', firstUp:'5:30AM', lastUp:'11:45PM', firstDn:'5:30AM', lastDn:'11:45PM', fare:28, type:'regular' },
  { no:'43',   from:'Katraj',            to:'Nigdi',                 via:'Deccan, Shivajinagar, Akurdi',          freq:'Every 20 min', firstUp:'5:30AM', lastUp:'11:45PM', firstDn:'5:30AM', lastDn:'11:45PM', fare:28, type:'regular' },
  { no:'44',   from:'Sinhgad Paytha',    to:'Shanivarwada',          via:'Swargate, Camp',                        freq:'Every 45 min', firstUp:'5:00AM', lastUp:'8:55PM',  firstDn:'6:10AM', lastDn:'10:30PM', fare:20, type:'regular' },
  { no:'45',   from:'Katraj',            to:'Mahalunge Balewadi',    via:'Deccan, Baner',                         freq:'6 trips',      firstUp:'5:10AM', lastUp:'6:00PM',  firstDn:'6:50AM', lastDn:'8:00PM',  fare:28, type:'regular' },
  { no:'46',   from:'Swargate',          to:'Wagholi (Dhanori)',     via:'Hadapsar, Lohegaon',                    freq:'4 trips',      firstUp:'5:00AM', lastUp:'6:40PM',  firstDn:'6:50AM', lastDn:'8:40PM',  fare:30, type:'regular' },
  { no:'47',   from:'Swargate',          to:'Sanaswadi',             via:'Hadapsar, Manjari',                     freq:'6 trips',      firstUp:'5:40AM', lastUp:'7:50PM',  firstDn:'6:45AM', lastDn:'9:00PM',  fare:32, type:'regular' },
  { no:'50',   from:'Swargate',          to:'Sinhgad Paytha',        via:'Deccan, Kothrud, Vadgaon',              freq:'Every 45 min', firstUp:'5:00AM', lastUp:'8:55PM',  firstDn:'6:10AM', lastDn:'10:30PM', fare:22, type:'regular' },
  { no:'50A',  from:'Deccan Gymkhana',   to:'Sinhgad Paytha',        via:'Kothrud, Vadgaon',                      freq:'4 trips',      firstUp:'5:00AM', lastUp:'8:10AM',  firstDn:'6:00AM', lastDn:'9:20AM',  fare:18, type:'regular' },
  { no:'51',   from:'Shivajinagar',      to:'Dhayareshwar Mandir',   via:'Kothrud, DSK',                          freq:'6 trips',      firstUp:'4:35AM', lastUp:'7:10PM',  firstDn:'5:45AM', lastDn:'8:30PM',  fare:22, type:'regular' },
  { no:'52',   from:'Swargate',          to:'Varasgaon',             via:'Sinhgad Road',                          freq:'Every 30 min', firstUp:'5:05AM', lastUp:'8:55PM',  firstDn:'6:15AM', lastDn:'10:35PM', fare:35, type:'regular' },
  { no:'52A',  from:'Swargate',          to:'Khanapur',              via:'Sinhgad Road',                          freq:'Every 30 min', firstUp:'6:05AM', lastUp:'6:50PM',  firstDn:'6:50AM', lastDn:'10:30PM', fare:28, type:'regular' },
  { no:'55',   from:'Swargate',          to:'Suncity',               via:'Wanowri, Fursungi',                     freq:'3 trips',      firstUp:'5:40AM', lastUp:'7:00AM',  firstDn:'9:45PM', lastDn:'11:15PM', fare:22, type:'regular' },
  { no:'57',   from:'Pune Station',      to:'Venutai College',       via:'Shivajinagar, Baner',                   freq:'3 trips',      firstUp:'8:50AM', lastUp:'4:45PM',  firstDn:'10:00AM',lastDn:'6:00PM',  fare:22, type:'regular' },
  { no:'58',   from:'Shanipar Stand',    to:'Gokhale Nagar',         via:'Deccan, Shivajinagar',                  freq:'Every 20 min', firstUp:'5:30AM', lastUp:'10:30PM', firstDn:'6:10AM', lastDn:'10:30PM', fare:16, type:'regular' },
  { no:'59',   from:'Katraj',            to:'Sarola',                via:'Dive Phata',                            freq:'4 trips',      firstUp:'5:50AM', lastUp:'6:35PM',  firstDn:'6:50AM', lastDn:'8:00PM',  fare:30, type:'regular' },
  { no:'60',   from:'Hadapsar',          to:'Patas',                 via:'Solapur Road',                          freq:'Every 40 min', firstUp:'4:50AM', lastUp:'9:15PM',  firstDn:'5:50AM', lastDn:'10:25PM', fare:40, type:'regular' },
  { no:'61',   from:'Katraj',            to:'Sarola',                via:'Dive Phata, Jejuri',                    freq:'4 trips',      firstUp:'6:00AM', lastUp:'5:35PM',  firstDn:'7:00AM', lastDn:'8:00PM',  fare:35, type:'regular' },
  { no:'64',   from:'Bhekrai Nagar',     to:'NDA Gate',              via:'Swargate, Kothrud',                     freq:'Every 30 min', firstUp:'4:50AM', lastUp:'9:00PM',  firstDn:'5:50AM', lastDn:'10:55PM', fare:25, type:'regular' },
  { no:'65A',  from:'Aditya Garden City',to:'Shewalewadi',           via:'Dhayari',                               freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:25PM',  firstDn:'6:30AM', lastDn:'10:15PM', fare:20, type:'regular' },
  { no:'66',   from:'Marketyard',        to:'Agalambe',              via:'Swargate, Sinhgad Road',                freq:'4 trips',      firstUp:'8:45AM', lastUp:'6:25PM',  firstDn:'6:35AM', lastDn:'4:15PM',  fare:35, type:'regular' },
  { no:'67',   from:'Hadapsar',          to:'Prayagdham',            via:'Solapur Road',                          freq:'4 trips',      firstUp:'5:25AM', lastUp:'5:40PM',  firstDn:'6:45AM', lastDn:'6:55PM',  fare:30, type:'regular' },
  { no:'69',   from:'Marketyard',        to:'Ghotawade',             via:'Katraj, Sinhgad Road',                  freq:'5 trips',      firstUp:'5:50AM', lastUp:'8:15PM',  firstDn:'6:30AM', lastDn:'7:45PM',  fare:30, type:'regular' },
  { no:'70',   from:'Marketyard',        to:'Mulshi Gaon',           via:'Swargate, Kothrud',                     freq:'Every 40 min', firstUp:'6:30AM', lastUp:'8:50PM',  firstDn:'6:20AM', lastDn:'9:30PM',  fare:35, type:'regular' },
  { no:'72',   from:'Sukhsagar',         to:'Kondhwagate',           via:'Swargate, Bibewadi',                    freq:'Every 35 min', firstUp:'7:10AM', lastUp:'9:45PM',  firstDn:'7:10AM', lastDn:'9:45PM',  fare:20, type:'regular' },
  { no:'76',   from:'Galinde Path',      to:'Manapa Bhavan',         via:'Kothrud, Deccan',                       freq:'6 trips',      firstUp:'8:00AM', lastUp:'7:00PM',  firstDn:'8:45AM', lastDn:'7:45PM',  fare:22, type:'regular' },
  { no:'77',   from:'Hinjewadi',         to:'Warje Malwadi',         via:'Baner, Aundh',                          freq:'4 trips',      firstUp:'5:00AM', lastUp:'7:20PM',  firstDn:'6:40AM', lastDn:'9:35PM',  fare:28, type:'regular' },
  { no:'79',   from:'Hinjewadi Phase 3', to:'Deccan Gymkhana',       via:'Baner, Aundh, FC Road',                 freq:'Every 30 min', firstUp:'6:15AM', lastUp:'10:00PM', firstDn:'7:00AM', lastDn:'10:00PM', fare:30, type:'regular' },
  { no:'80',   from:'Deccan',            to:'Muthagaon',             via:'Paud Road',                             freq:'Every 35 min', firstUp:'6:35AM', lastUp:'1:45PM',  firstDn:'7:25AM', lastDn:'2:10PM',  fare:25, type:'regular' },
  { no:'83',   from:'NDA Gate',          to:'Alandi Darshan',        via:'Shivajinagar, Yerwada',                 freq:'4 trips',      firstUp:'6:30AM', lastUp:'9:00PM',  firstDn:'8:20AM', lastDn:'11:00PM', fare:35, type:'regular' },
  { no:'84',   from:'Deccan',            to:'Muthagaon',             via:'Paud Road, Kothrud',                    freq:'Every 30 min', firstUp:'6:00AM', lastUp:'8:15PM',  firstDn:'6:20AM', lastDn:'9:30PM',  fare:22, type:'regular' },
  { no:'85',   from:'Manapa',            to:'Ahiregaon/Khadewadi',   via:'Pimpri, Nigdi',                         freq:'4 trips',      firstUp:'6:05AM', lastUp:'5:05PM',  firstDn:'7:00AM', lastDn:'6:50PM',  fare:25, type:'regular' },
  { no:'86',   from:'Gokhale Nagar',     to:'Katraj',                via:'Deccan, Swargate',                      freq:'Every 30 min', firstUp:'5:35AM', lastUp:'10:10PM', firstDn:'6:15AM', lastDn:'9:50PM',  fare:20, type:'regular' },
  { no:'87',   from:'Sutarwadi',         to:'Deccan',                via:'Paud Road, Kothrud',                    freq:'Every 30 min', firstUp:'5:50AM', lastUp:'9:20PM',  firstDn:'6:45AM', lastDn:'10:25PM', fare:22, type:'regular' },
  { no:'90',   from:'Deccan',            to:'Symbiosis University',  via:'Lavale, Mulshi',                        freq:'Every 40 min', firstUp:'5:35AM', lastUp:'5:20PM',  firstDn:'8:00AM', lastDn:'10:20PM', fare:30, type:'regular' },
  { no:'93',   from:'Wakad Pul',         to:'Deccan',                via:'Baner, FC Road',                        freq:'6 trips',      firstUp:'6:00AM', lastUp:'8:20PM',  firstDn:'7:15AM', lastDn:'10:10PM', fare:25, type:'regular' },
  { no:'94',   from:'Pune Station',      to:'Matalwadi Bhugaon',     via:'Deccan, Kothrud',                       freq:'Every 30 min', firstUp:'4:35AM', lastUp:'9:40PM',  firstDn:'6:10AM', lastDn:'9:50PM',  fare:30, type:'regular' },
  { no:'95',   from:'Deccan Gymkhana',   to:'PVPIT Bavadhan',        via:'Kothrud, Paud Road',                    freq:'4 trips',      firstUp:'7:40AM', lastUp:'5:10PM',  firstDn:'8:30AM', lastDn:'6:00PM',  fare:22, type:'regular' },
  { no:'96',   from:'Swargate',          to:'Jambali Nilkanteshwar', via:'Bibewadi, Ambegaon',                    freq:'2 trips',      firstUp:'7:30AM', lastUp:'2:00PM',  firstDn:'10:00AM',lastDn:'4:15PM',  fare:28, type:'regular' },
  { no:'97',   from:'Warje Malwadi',     to:'Sahakar Nagar',         via:'Swargate, Bibewadi',                    freq:'4 trips',      firstUp:'8:35AM', lastUp:'5:35PM',  firstDn:'9:45AM', lastDn:'6:50PM',  fare:18, type:'regular' },
  { no:'98',   from:'Wagholi',           to:'Waraje Malawadi',       via:'Ramwadi, Shivajinagar',                 freq:'Every 20 min', firstUp:'5:10AM', lastUp:'11:15PM', firstDn:'5:00AM', lastDn:'10:55PM', fare:28, type:'regular' },
  { no:'99',   from:'Kothrud Depo',      to:'Vishrantwadi Kekan Gas',via:'Deccan, Shivajinagar, Yerwada',         freq:'Every 30 min', firstUp:'4:45AM', lastUp:'10:30PM', firstDn:'6:00AM', lastDn:'10:30PM', fare:25, type:'regular' },
  { no:'100',  from:'Manapa',            to:'Hinjewadi Phase 3',     via:'Akurdi, Wakad',                         freq:'Every 20 min', firstUp:'5:30AM', lastUp:'11:00PM', firstDn:'5:00AM', lastDn:'10:40PM', fare:30, type:'regular' },
  { no:'101',  from:'Yewalewadi',        to:'Deccan Gymkhana',       via:'Swargate, Deccan',                      freq:'5 trips',      firstUp:'6:30AM', lastUp:'7:15PM',  firstDn:'7:50AM', lastDn:'9:05PM',  fare:22, type:'regular' },
  { no:'103',  from:'Katraj',            to:'MIT',                   via:'Kothrud Depo',                          freq:'5 trips',      firstUp:'6:00AM', lastUp:'4:40PM',  firstDn:'7:00AM', lastDn:'5:45PM',  fare:22, type:'regular' },
  { no:'104',  from:'Shivajinagar',      to:'Dhayari DSK',           via:'Deccan, Kothrud',                       freq:'Every 35 min', firstUp:'5:50AM', lastUp:'8:15PM',  firstDn:'6:50AM', lastDn:'7:00PM',  fare:22, type:'regular' },
  { no:'104A', from:'Shivajinagar',      to:'Suncity',               via:'Camp, Wanowri',                         freq:'6 trips',      firstUp:'6:20AM', lastUp:'8:40PM',  firstDn:'7:30AM', lastDn:'9:50PM',  fare:20, type:'regular' },
  { no:'105',  from:'Deccan Gymkhana',   to:'Medi Point',            via:'Kothrud',                               freq:'Every 30 min', firstUp:'5:40AM', lastUp:'5:45PM',  firstDn:'7:00AM', lastDn:'7:00PM',  fare:18, type:'regular' },
  { no:'106',  from:'Deccan',            to:'Narhegaon',             via:'Kondhwa',                               freq:'Every 30 min', firstUp:'5:30AM', lastUp:'5:00PM',  firstDn:'6:30AM', lastDn:'6:20PM',  fare:20, type:'regular' },
  { no:'107',  from:'Warje Malwadi',     to:'Pimplegurav',           via:'Swargate, Shivajinagar',                freq:'5 trips',      firstUp:'5:15AM', lastUp:'5:30PM',  firstDn:'6:20AM', lastDn:'7:40PM',  fare:25, type:'regular' },
  { no:'108',  from:'Sutaradara Paud Rd',to:'Pune Station',          via:'Deccan, Camp',                          freq:'5 trips',      firstUp:'7:30AM', lastUp:'5:30PM',  firstDn:'8:20AM', lastDn:'6:35PM',  fare:22, type:'regular' },
  { no:'109',  from:'Shivajinagar',      to:'Dhayari DSK',           via:'Kothrud',                               freq:'Every 30 min', firstUp:'6:15AM', lastUp:'9:00PM',  firstDn:'7:35AM', lastDn:'10:30PM', fare:22, type:'regular' },
  { no:'111',  from:'Bhekrainagar',      to:'Manapa',                via:'Pimpri, Akurdi',                        freq:'Every 45 min', firstUp:'5:35AM', lastUp:'9:40PM',  firstDn:'6:20AM', lastDn:'10:25PM', fare:25, type:'regular' },
  { no:'113',  from:'Sangvi',            to:'ABC Chowk',             via:'Aundh',                                 freq:'Every 25 min', firstUp:'4:55AM', lastUp:'9:50PM',  firstDn:'5:45AM', lastDn:'10:45PM', fare:16, type:'regular' },
  { no:'114',  from:'Padale Chowk Mahalungegaon',to:'Manapa',       via:'Mahalunge, Wakad',                       freq:'Every 20 min', firstUp:'4:30AM', lastUp:'9:45PM',  firstDn:'4:50AM', lastDn:'11:35PM', fare:22, type:'regular' },
  { no:'115',  from:'Pune Station',      to:'Hinjewadi Phase 3',     via:'Shivajinagar, Baner, Aundh',            freq:'Every 35 min', firstUp:'5:35AM', lastUp:'9:50PM',  firstDn:'6:45AM', lastDn:'11:10PM', fare:28, type:'regular' },
  { no:'117',  from:'Swargate',          to:'Dhayareshwar Mandir',   via:'Sinhgad Road',                          freq:'Every 30 min', firstUp:'5:15AM', lastUp:'10:40PM', firstDn:'6:00AM', lastDn:'11:00PM', fare:22, type:'regular' },
  { no:'118',  from:'Swargate',          to:'Nandedgaon Bageshree',  via:'Sinhgad Road',                          freq:'Every 30 min', firstUp:'6:00AM', lastUp:'9:05PM',  firstDn:'7:00AM', lastDn:'10:15PM', fare:25, type:'regular' },
  { no:'119',  from:'Manapa',            to:'Alandi',                via:'Dapodi, Bhosari',                       freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:35AM',  firstDn:'6:40AM', lastDn:'9:45PM',  fare:30, type:'regular' },
  { no:'120',  from:'Bhosari',           to:'Mahalunge Endurance',   via:'Wakad, Hinjewadi',                      freq:'Every 30 min', firstUp:'5:35AM', lastUp:'9:50PM',  firstDn:'6:45AM', lastDn:'11:05PM', fare:25, type:'regular' },
  { no:'121',  from:'Bhosari',           to:'Manapa',                via:'Pimpri, Chinchwad',                     freq:'Every 30 min', firstUp:'5:25AM', lastUp:'9:40PM',  firstDn:'6:15AM', lastDn:'11:30PM', fare:18, type:'regular' },
  { no:'122',  from:'Manapa',            to:'Chinchwadgaon',         via:'Chinchwad, Pimpri',                     freq:'Every 30 min', firstUp:'5:30AM', lastUp:'10:45PM', firstDn:'5:40AM', lastDn:'11:20PM', fare:18, type:'regular' },
  { no:'123',  from:'Manapa',            to:'Nigdi',                 via:'Pimpri, Akurdi',                        freq:'Every 25 min', firstUp:'5:20AM', lastUp:'10:00PM', firstDn:'6:40AM', lastDn:'10:00PM', fare:18, type:'regular' },
  { no:'124',  from:'Aundhgaon',         to:'Neilsoft Infosys F3',   via:'Baner, Hinjewadi',                      freq:'Every 30 min', firstUp:'5:30AM', lastUp:'6:10PM',  firstDn:'6:10AM', lastDn:'6:35PM',  fare:28, type:'regular' },
  { no:'125',  from:'PCMC/Manapa',       to:'Swargate',              via:'Pimpri, Deccan, Shivajinagar',          freq:'Every 30 min', firstUp:'5:30AM', lastUp:'10:30PM', firstDn:'6:15AM', lastDn:'11:50PM', fare:28, type:'regular' },
  { no:'126',  from:'Bopkhel',           to:'Pimple Nilakh',         via:'Kasarwadi',                             freq:'Every 30 min', firstUp:'5:25AM', lastUp:'3:40PM',  firstDn:'1:35PM', lastDn:'11:50PM', fare:18, type:'regular' },
  { no:'130',  from:'Swargate',          to:'Narhegaon',             via:'Bibewadi, Ambegaon',                    freq:'Every 30 min', firstUp:'5:45AM', lastUp:'8:25PM',  firstDn:'6:45AM', lastDn:'9:35PM',  fare:22, type:'regular' },
  { no:'131',  from:'Manapa',            to:'Golegaon',              via:'Chakan',                                freq:'5 trips',      firstUp:'7:55AM', lastUp:'9:15PM',  firstDn:'6:35AM', lastDn:'7:15PM',  fare:35, type:'regular' },
  { no:'138',  from:'Wagholi',           to:'Bakori',                via:'Wagholi Bypass',                        freq:'Every 30 min', firstUp:'4:35AM', lastUp:'9:35PM',  firstDn:'6:50AM', lastDn:'11:50PM', fare:30, type:'regular' },
  { no:'139',  from:'Station',           to:'Shewalewadi',           via:'Swargate, Kondhwa',                     freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:55PM',  firstDn:'6:15AM', lastDn:'10:30PM', fare:22, type:'regular' },
  { no:'140',  from:'Pune Station',      to:'Upper Depo',            via:'Deccan, Kothrud',                       freq:'Every 30 min', firstUp:'6:30AM', lastUp:'8:00PM',  firstDn:'7:20AM', lastDn:'8:30PM',  fare:22, type:'regular' },
  { no:'143',  from:'Bhekrainagar',      to:'Nigdi',                 via:'Pimpri, Chinchwad',                     freq:'Every 25 min', firstUp:'5:30AM', lastUp:'10:30PM', firstDn:'5:30AM', lastDn:'10:50PM', fare:20, type:'regular' },
  { no:'144',  from:'Kondhwa Gate',      to:'Pune Station',          via:'Camp, Swargate',                        freq:'Every 30 min', firstUp:'5:30AM', lastUp:'10:10PM', firstDn:'5:30AM', lastDn:'11:30PM', fare:20, type:'regular' },
  { no:'145',  from:'Pune Station',      to:'Sutarwadi',             via:'Deccan, Kothrud',                       freq:'5 trips',      firstUp:'7:30AM', lastUp:'6:00PM',  firstDn:'8:35AM', lastDn:'7:05PM',  fare:22, type:'regular' },
  { no:'146',  from:'Pimplegurav',       to:'Shewalewadi',           via:'Nigdi, Akurdi',                         freq:'Every 30 min', firstUp:'4:50AM', lastUp:'9:05PM',  firstDn:'5:15AM', lastDn:'9:55PM',  fare:22, type:'regular' },
  { no:'148',  from:'Station',           to:'Kondhwa Gate',          via:'Camp, Swargate',                        freq:'Every 30 min', firstUp:'5:45AM', lastUp:'10:25PM', firstDn:'5:45AM', lastDn:'11:35PM', fare:20, type:'regular' },
  { no:'149',  from:'Hadapsar',          to:'Nigdi',                 via:'Swargate, Shivajinagar, Pimpri',        freq:'Every 25 min', firstUp:'4:40AM', lastUp:'10:45PM', firstDn:'5:00AM', lastDn:'11:30PM', fare:28, type:'regular' },
  { no:'151',  from:'Alandi',            to:'Pune Station',          via:'Bhosari, Pimpri, Shivajinagar',         freq:'Every 45 min', firstUp:'5:05AM', lastUp:'8:20PM',  firstDn:'6:10AM', lastDn:'10:35PM', fare:35, type:'regular' },
  { no:'152',  from:'Manapa',            to:'Diamond Water Park',    via:'Pimpri, Akurdi',                        freq:'Every 40 min', firstUp:'5:20AM', lastUp:'9:15PM',  firstDn:'6:30AM', lastDn:'10:05PM', fare:25, type:'regular' },
  { no:'155',  from:'Diamond Water Park',to:'Pune Station',          via:'Pimpri, Shivajinagar',                  freq:'5 trips',      firstUp:'6:15AM', lastUp:'7:50AM',  firstDn:'8:00AM', lastDn:'9:50AM',  fare:28, type:'regular' },
  { no:'157',  from:'Manapa',            to:'Wagholi JSPM College',  via:'Pimpri, Ramwadi',                       freq:'Every 30 min', firstUp:'5:05AM', lastUp:'11:00PM', firstDn:'6:05AM', lastDn:'11:50PM', fare:30, type:'regular' },
  { no:'158',  from:'Manapa',            to:'Pride World City',      via:'Lohegaon',                              freq:'Every 20 min', firstUp:'5:10AM', lastUp:'10:10PM', firstDn:'6:00AM', lastDn:'11:20PM', fare:25, type:'regular' },
  { no:'159',  from:'Manapa',            to:'Talegaon Dhamdhere',    via:'Wagholi, Sanaswadi',                    freq:'Every 40 min', firstUp:'5:00AM', lastUp:'8:25PM',  firstDn:'5:30AM', lastDn:'8:30PM',  fare:35, type:'regular' },
  { no:'160',  from:'Manjari BK',        to:'Shanivarwada',          via:'Hadapsar, Swargate',                    freq:'Every 35 min', firstUp:'4:50AM', lastUp:'9:35PM',  firstDn:'5:50AM', lastDn:'10:40PM', fare:22, type:'regular' },
  { no:'163',  from:'Station',           to:'Dhole Patil College',   via:'Camp, Koregaon Park',                   freq:'Every 30 min', firstUp:'5:05AM', lastUp:'10:40PM', firstDn:'6:05AM', lastDn:'11:50PM', fare:18, type:'regular' },
  { no:'164',  from:'Manapa',            to:'Nhavare',               via:'Wagholi',                               freq:'5 trips',      firstUp:'5:30AM', lastUp:'6:35PM',  firstDn:'10:15AM',lastDn:'7:30PM',  fare:30, type:'regular' },
  { no:'165',  from:'Manapa',            to:'Vadgaon Sheri',         via:'Wagholi',                               freq:'Every 20 min', firstUp:'5:15AM', lastUp:'11:00PM', firstDn:'6:10AM', lastDn:'11:25PM', fare:22, type:'regular' },
  { no:'166',  from:'Pune Station',      to:'Lohegaon Airport',      via:'Yerwada',                               freq:'Every 10 min', firstUp:'4:40AM', lastUp:'11:00PM', firstDn:'6:00AM', lastDn:'11:30PM', fare:20, type:'regular' },
  { no:'167',  from:'Hadapsar',          to:'Wagholi',               via:'Bhosari Nagar',                         freq:'Every 20 min', firstUp:'5:05AM', lastUp:'10:35PM', firstDn:'6:10AM', lastDn:'11:45PM', fare:22, type:'regular' },
  { no:'168',  from:'Shaniwarwada',      to:'Keshavnagar',           via:'Camp, Koregaon Park, Mundhwa',          freq:'Every 30 min', firstUp:'5:15AM', lastUp:'9:50PM',  firstDn:'6:15AM', lastDn:'11:00PM', fare:22, type:'regular' },
  { no:'169',  from:'Keshavanagar',      to:'Shaniwarwada',          via:'Mundhwa, Koregaon Park',                freq:'Every 30 min', firstUp:'5:35AM', lastUp:'9:40PM',  firstDn:'6:45AM', lastDn:'11:10PM', fare:22, type:'regular' },
  { no:'170',  from:'Hadapsar',          to:'Lohegaon Khandoba Maal',via:'Ramwadi',                               freq:'Every 35 min', firstUp:'7:50AM', lastUp:'9:35PM',  firstDn:'8:25AM', lastDn:'10:25PM', fare:20, type:'regular' },
  { no:'172',  from:'Yewalewadi',        to:'Pune Station',          via:'Swargate, Camp',                        freq:'6 trips',      firstUp:'6:00AM', lastUp:'7:25PM',  firstDn:'7:10AM', lastDn:'9:10PM',  fare:22, type:'regular' },
  { no:'175',  from:'Hadapsar',          to:'Shaniwarwada',          via:'Swargate, Camp',                        freq:'5 trips',      firstUp:'6:05AM', lastUp:'5:00PM',  firstDn:'6:50AM', lastDn:'6:15PM',  fare:20, type:'regular' },
  { no:'176',  from:'Vadachi Wadi',      to:'Pune Station',          via:'Swargate, Camp',                        freq:'4 trips',      firstUp:'7:25AM', lastUp:'5:55PM',  firstDn:'8:45AM', lastDn:'7:15PM',  fare:25, type:'regular' },
  { no:'178',  from:'Swargate',          to:'SRP Camp Wanwadi',      via:'Kondhwa',                               freq:'6 trips',      firstUp:'7:45AM', lastUp:'6:30PM',  firstDn:'8:30AM', lastDn:'7:15PM',  fare:18, type:'regular' },
  { no:'181',  from:'Natawadi',          to:'Kondhwa BK',            via:'Swargate',                              freq:'6 trips',      firstUp:'5:00AM', lastUp:'7:35PM',  firstDn:'6:10AM', lastDn:'8:50PM',  fare:22, type:'regular' },
  { no:'183',  from:'Hadapsar',          to:'Ramdara Loni Kalbhor',  via:'Solapur Road',                          freq:'4 trips',      firstUp:'5:15AM', lastUp:'7:05PM',  firstDn:'6:10AM', lastDn:'8:00PM',  fare:28, type:'regular' },
  { no:'185',  from:'Hadapsar',          to:'Wagholi',               via:'Bhosari Nagar',                         freq:'Every 20 min', firstUp:'5:10AM', lastUp:'11:00PM', firstDn:'5:00AM', lastDn:'10:55PM', fare:22, type:'regular' },
  { no:'186',  from:'Katraj',            to:'Hadapsar',              via:'Swargate, Bibewadi',                    freq:'Every 25 min', firstUp:'5:30AM', lastUp:'11:00PM', firstDn:'6:45AM', lastDn:'11:10PM', fare:20, type:'regular' },
  { no:'188',  from:'Bhekrainagar',      to:'Natawadi',              via:'Pimpri, Chinchwad',                     freq:'4 trips',      firstUp:'4:30AM', lastUp:'9:25PM',  firstDn:'5:45AM', lastDn:'10:45PM', fare:22, type:'regular' },
  { no:'192',  from:'Kothrud Depo',      to:'Shewalewadi',           via:'Paud Road, Katraj',                     freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:50PM',  firstDn:'6:00AM', lastDn:'9:50PM',  fare:22, type:'regular' },
  { no:'199',  from:'Shewalewadi',       to:'Kothrud Depo',          via:'Paud Road',                             freq:'Every 30 min', firstUp:'5:00AM', lastUp:'9:00PM',  firstDn:'6:50AM', lastDn:'9:45PM',  fare:20, type:'regular' },
  { no:'200',  from:'Shewalewadi',       to:'Alandi',                via:'Swargate, Shivajinagar, Bhosari',       freq:'Every 35 min', firstUp:'4:45AM', lastUp:'9:30PM',  firstDn:'5:00AM', lastDn:'9:45PM',  fare:30, type:'regular' },
  { no:'201',  from:'Bhekrainagar',      to:'Alandi',                via:'Pimpri, Bhosari',                       freq:'Every 30 min', firstUp:'5:00AM', lastUp:'9:45PM',  firstDn:'6:00AM', lastDn:'10:15PM', fare:28, type:'regular' },
  { no:'204',  from:'Sangvi',            to:'Shewalewadi',           via:'Deccan, Swargate, Kondhwa',             freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:45PM',  firstDn:'5:30AM', lastDn:'10:30PM', fare:25, type:'regular' },
  { no:'207',  from:'Swargate',          to:'Saswad',                via:'Dive Phata',                            freq:'Every 35 min', firstUp:'5:25AM', lastUp:'10:30PM', firstDn:'5:50AM', lastDn:'11:05PM', fare:35, type:'regular' },
  { no:'208',  from:'Hinjewadi F3',      to:'Bhekrainagar',          via:'Wakad, Pimpri',                         freq:'Every 30 min', firstUp:'5:15AM', lastUp:'9:55PM',  firstDn:'6:10AM', lastDn:'10:40PM', fare:28, type:'regular' },
  { no:'209',  from:'Katraj',            to:'Saswad',                via:'Dive, Ambegaon',                        freq:'Every 35 min', firstUp:'6:30AM', lastUp:'7:35PM',  firstDn:'6:30AM', lastDn:'8:10PM',  fare:32, type:'regular' },
  { no:'210',  from:'Katraj',            to:'Hinjewadi Phase 3',     via:'Deccan, Baner, Wakad',                  freq:'Every 30 min', firstUp:'5:10AM', lastUp:'8:00PM',  firstDn:'6:50AM', lastDn:'9:00PM',  fare:30, type:'regular' },
  { no:'211',  from:'Katraj',            to:'Sinhgad College',       via:'Ambegaon',                              freq:'Every 30 min', firstUp:'4:35AM', lastUp:'9:05PM',  firstDn:'5:10AM', lastDn:'9:35PM',  fare:22, type:'regular' },
  { no:'212',  from:'Hadapsar',          to:'Morgaon',               via:'Solapur Road',                          freq:'3 trips',      firstUp:'9:05AM', lastUp:'8:00PM',  firstDn:'6:30AM', lastDn:'5:00PM',  fare:50, type:'regular' },
  { no:'213',  from:'Hadapsar',          to:'Jejuri MIDC',           via:'Solapur Road',                          freq:'Every 40 min', firstUp:'6:25AM', lastUp:'9:00PM',  firstDn:'6:50AM', lastDn:'9:45PM',  fare:45, type:'regular' },
  { no:'215',  from:'Swargate',          to:'Ambegaon Pathar',       via:'Bibewadi, Katraj',                      freq:'Every 30 min', firstUp:'5:40AM', lastUp:'9:50PM',  firstDn:'6:40AM', lastDn:'10:50PM', fare:22, type:'regular' },
  { no:'219',  from:'Kothrud Depo',      to:'Alandi',                via:'Deccan, Shivajinagar, Bhosari',         freq:'4 trips',      firstUp:'6:05AM', lastUp:'6:15PM',  firstDn:'7:40AM', lastDn:'8:05PM',  fare:35, type:'regular' },
  { no:'221',  from:'Wagholi',           to:'IV Estate Wagholi',     via:'Wagholi',                               freq:'Every 40 min', firstUp:'6:40AM', lastUp:'7:10PM',  firstDn:'7:20AM', lastDn:'7:50PM',  fare:12, type:'regular' },
  { no:'227',  from:'Marketyard',        to:'Urawade Marnewadi',     via:'Swargate, Sinhgad Road',                freq:'4 trips',      firstUp:'5:10AM', lastUp:'6:55PM',  firstDn:'6:50AM', lastDn:'8:45PM',  fare:35, type:'regular' },
  { no:'233',  from:'Marketyard',        to:'Paudgaon',              via:'Katraj, Sinhgad Road',                  freq:'Every 40 min', firstUp:'6:20AM', lastUp:'8:30PM',  firstDn:'6:30AM', lastDn:'9:00PM',  fare:35, type:'regular' },
  { no:'234',  from:'Wagholi',           to:'IV Estate',             via:'Wagholi',                               freq:'Every 30 min', firstUp:'6:30AM', lastUp:'9:40PM',  firstDn:'6:50AM', lastDn:'10:15PM', fare:12, type:'regular' },
  { no:'235',  from:'Bhosari',           to:'Bhekrainagar',          via:'Pimpri',                                freq:'Every 30 min', firstUp:'5:10AM', lastUp:'9:30PM',  firstDn:'5:45AM', lastDn:'10:30PM', fare:16, type:'regular' },
  { no:'236',  from:'Bhosari',           to:'Kothrud Depo',          via:'Pimpri, Deccan, Kothrud',               freq:'Every 30 min', firstUp:'5:00AM', lastUp:'9:30PM',  firstDn:'5:00AM', lastDn:'9:00PM',  fare:28, type:'regular' },
  { no:'256',  from:'Bhosari',           to:'Alandi',                via:'Dapodi, Bhosari',                       freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:00PM',  firstDn:'6:15AM', lastDn:'8:35PM',  fare:22, type:'regular' },
  { no:'257',  from:'Wagholi',           to:'Indian Oil Tulapur',    via:'Sanaswadi',                             freq:'Every 40 min', firstUp:'6:30AM', lastUp:'8:20PM',  firstDn:'5:40AM', lastDn:'10:05PM', fare:28, type:'regular' },
  { no:'264',  from:'Bhosari',           to:'Pabalgaon',             via:'Alandi',                                freq:'3 trips',      firstUp:'9:00AM', lastUp:'6:30PM',  firstDn:'6:45AM', lastDn:'3:45PM',  fare:35, type:'regular' },
  { no:'276',  from:'Warje Malwadi',     to:'Chinchwadgaon',         via:'Deccan, Shivajinagar, Pimpri',          freq:'Every 20 min', firstUp:'5:30AM', lastUp:'11:45PM', firstDn:'5:30AM', lastDn:'11:45PM', fare:25, type:'regular' },
  { no:'281',  from:'Swargate',          to:'Jambhulwadi',           via:'Bibewadi, Ambegaon',                    freq:'Every 25 min', firstUp:'4:55AM', lastUp:'11:00PM', firstDn:'5:05AM', lastDn:'11:15PM', fare:22, type:'regular' },
  { no:'282',  from:'Warje Malwadi',     to:'Bhosari',               via:'Deccan, Pimpri',                        freq:'Every 25 min', firstUp:'4:50AM', lastUp:'11:00PM', firstDn:'5:55AM', lastDn:'11:05PM', fare:25, type:'regular' },
  { no:'289',  from:'Shewalewadi',       to:'Upper Depo',            via:'Katraj, Swargate',                      freq:'Every 30 min', firstUp:'5:35AM', lastUp:'9:55PM',  firstDn:'5:55AM', lastDn:'9:55PM',  fare:22, type:'regular' },
  { no:'290',  from:'Upper Depo',        to:'Shewalewadi',           via:'Swargate, Katraj',                      freq:'Every 30 min', firstUp:'4:50AM', lastUp:'10:15PM', firstDn:'6:45AM', lastDn:'10:30PM', fare:22, type:'regular' },
  { no:'291',  from:'Warje Malwadi',     to:'Nigdi',                 via:'Deccan, Shivajinagar, Pimpri',          freq:'Every 25 min', firstUp:'4:40AM', lastUp:'10:35PM', firstDn:'5:55AM', lastDn:'11:00PM', fare:25, type:'regular' },
  { no:'292',  from:'Katraj',            to:'Kondhanpur Aarvi',      via:'Ambegaon, Dive',                        freq:'5 trips',      firstUp:'6:00AM', lastUp:'5:15PM',  firstDn:'7:15AM', lastDn:'6:35PM',  fare:35, type:'regular' },
  { no:'293',  from:'Katraj',            to:'Saswad via Kapurvhol',  via:'Ambegaon',                              freq:'3 trips',      firstUp:'6:20AM', lastUp:'4:00PM',  firstDn:'8:10AM', lastDn:'6:10PM',  fare:35, type:'regular' },
  { no:'298',  from:'Katraj',            to:'Chinchwadgaon',         via:'Deccan, Shivajinagar, Pimpri',          freq:'Every 20 min', firstUp:'5:45AM', lastUp:'11:00PM', firstDn:'5:45AM', lastDn:'11:00PM', fare:25, type:'regular' },
  { no:'299',  from:'Katraj',            to:'Shewalewadi',           via:'Ambegaon, Kondhwa',                     freq:'Every 25 min', firstUp:'5:15AM', lastUp:'10:30PM', firstDn:'6:20AM', lastDn:'9:50PM',  fare:22, type:'regular' },
  { no:'301',  from:'Bhosari',           to:'Pimprigaon',            via:'Dapodi',                                freq:'Every 30 min', firstUp:'5:00AM', lastUp:'10:30PM', firstDn:'6:00AM', lastDn:'10:30PM', fare:16, type:'regular' },
  { no:'302',  from:'Bhosari',           to:'Katraj',                via:'Pimpri, Deccan, Swargate',              freq:'Every 30 min', firstUp:'5:45AM', lastUp:'9:35PM',  firstDn:'6:15AM', lastDn:'10:05PM', fare:28, type:'regular' },
  { no:'303',  from:'Nigdi',             to:'Bhosari',               via:'Pimpri, Akurdi',                        freq:'Every 25 min', firstUp:'5:00AM', lastUp:'9:50PM',  firstDn:'5:45AM', lastDn:'10:05PM', fare:18, type:'regular' },
  { no:'304',  from:'Chinchwadgaon',     to:'Bhosari',               via:'Pimpri',                                freq:'Every 30 min', firstUp:'5:05AM', lastUp:'9:40PM',  firstDn:'6:00AM', lastDn:'10:20PM', fare:18, type:'regular' },
  { no:'305',  from:'Nigdi',             to:'Wadgaon Maval',         via:'Wakad',                                 freq:'Every 30 min', firstUp:'5:50AM', lastUp:'10:00PM', firstDn:'6:50AM', lastDn:'10:30PM', fare:25, type:'regular' },
  { no:'307',  from:'Bhosari',           to:'Chinchwadgaon',         via:'Pimpri',                                freq:'Every 30 min', firstUp:'5:45AM', lastUp:'10:50PM', firstDn:'6:25AM', lastDn:'11:35PM', fare:16, type:'regular' },
  { no:'309',  from:'Bhosari',           to:'Alandi',                via:'Dapodi',                                freq:'Every 40 min', firstUp:'5:30AM', lastUp:'8:35PM',  firstDn:'7:00AM', lastDn:'9:30PM',  fare:20, type:'regular' },
  { no:'312',  from:'Pune Station',      to:'Bhosari',               via:'Shivajinagar, Pimpri',                  freq:'Every 30 min', firstUp:'5:55AM', lastUp:'10:35PM', firstDn:'6:00AM', lastDn:'10:15PM', fare:22, type:'regular' },
  { no:'313',  from:'Chandkhed',         to:'Chinchwad',             via:'Chakan',                                freq:'6 trips',      firstUp:'5:30AM', lastUp:'7:55AM',  firstDn:'7:30AM', lastDn:'9:10AM',  fare:30, type:'regular' },
  { no:'315',  from:'Chinchwadgaon',     to:'Pune Station',          via:'Pimpri, Shivajinagar',                  freq:'Every 30 min', firstUp:'5:35AM', lastUp:'10:50PM', firstDn:'5:40AM', lastDn:'11:15PM', fare:22, type:'regular' },
  { no:'317',  from:'Pune Station',      to:'Sambhaji Nagar',        via:'Shivajinagar',                          freq:'Every 30 min', firstUp:'6:00AM', lastUp:'10:35PM', firstDn:'6:45AM', lastDn:'11:00PM', fare:16, type:'regular' },
  { no:'319',  from:'Manapa',            to:'Akurdi Station',        via:'Pimpri, Chinchwad',                     freq:'Every 25 min', firstUp:'5:00AM', lastUp:'9:30PM',  firstDn:'5:40AM', lastDn:'10:00PM', fare:18, type:'regular' },
  { no:'320',  from:'Manapa',            to:'Akurdi Station',        via:'Dange Chowk, Wakad',                    freq:'Every 25 min', firstUp:'5:20AM', lastUp:'9:10PM',  firstDn:'6:10AM', lastDn:'9:50PM',  fare:18, type:'regular' },
  { no:'322',  from:'Pune Station',      to:'Krushna Nagar',         via:'Shivajinagar, Pimpri',                  freq:'Every 30 min', firstUp:'5:55AM', lastUp:'10:15PM', firstDn:'6:00AM', lastDn:'10:15PM', fare:20, type:'regular' },
  { no:'323',  from:'Manapa',            to:'Akurdi Station',        via:'Pimpri',                                freq:'Every 25 min', firstUp:'5:00AM', lastUp:'9:30PM',  firstDn:'5:40AM', lastDn:'10:00PM', fare:18, type:'regular' },
  { no:'324',  from:'Manapa',            to:'Chikhali Nageshwar',    via:'Dapodi, Kasarwadi',                     freq:'Every 30 min', firstUp:'5:25AM', lastUp:'9:10PM',  firstDn:'6:15AM', lastDn:'10:10PM', fare:20, type:'regular' },
  { no:'325',  from:'Pune Station',      to:'Pimple Saudagar',       via:'Shivajinagar, Baner, Aundh',            freq:'5 trips',      firstUp:'5:15AM', lastUp:'6:30PM',  firstDn:'6:30AM', lastDn:'8:00PM',  fare:25, type:'regular' },
  { no:'327',  from:'Bhosari',           to:'Alandi',                via:'Dapodi',                                freq:'4 trips',      firstUp:'6:00AM', lastUp:'7:30AM',  firstDn:'9:05PM', lastDn:'10:35PM', fare:20, type:'regular' },
  { no:'329',  from:'Hinjewadi',         to:'Bhosari',               via:'Wakad, Pimpri',                         freq:'Every 30 min', firstUp:'5:20AM', lastUp:'10:00PM', firstDn:'5:20AM', lastDn:'10:30PM', fare:28, type:'regular' },
  { no:'330',  from:'Bhosari',           to:'Alandi',                via:'Dapodi, Bhosari',                       freq:'4 trips',      firstUp:'6:10AM', lastUp:'4:30PM',  firstDn:'2:00PM', lastDn:'10:45PM', fare:20, type:'regular' },
  { no:'333',  from:'Talegaon Dabhade',  to:'Chakan Ambethan',       via:'Talegaon, Pradhikaran',                 freq:'Every 40 min', firstUp:'5:10AM', lastUp:'8:15PM',  firstDn:'5:10AM', lastDn:'7:55PM',  fare:30, type:'regular' },
  { no:'339',  from:'Sant Nagar',        to:'Katraj',                via:'Kondhwa',                               freq:'4 trips',      firstUp:'5:45AM', lastUp:'6:00PM',  firstDn:'7:30AM', lastDn:'8:00PM',  fare:22, type:'regular' },
  { no:'340',  from:'Bhosari',           to:'Talegaon Dabhade',      via:'Chakan',                                freq:'4 trips',      firstUp:'5:30AM', lastUp:'5:15PM',  firstDn:'5:10AM', lastDn:'6:30PM',  fare:35, type:'regular' },
  { no:'341',  from:'Nigdi',             to:'Tata Motors Bebadohal', via:'Pimpri, Akurdi',                        freq:'4 trips',      firstUp:'4:55AM', lastUp:'5:10PM',  firstDn:'12:45PM',lastDn:'7:50PM',  fare:22, type:'regular' },
  { no:'342',  from:'Nigdi',             to:'Ursegaon Vasudev Ashram',via:'Akurdi, Talegaon',                     freq:'5 trips',      firstUp:'6:35AM', lastUp:'5:40PM',  firstDn:'7:30AM', lastDn:'6:35PM',  fare:28, type:'regular' },
  { no:'344',  from:'Alandi',            to:'Bhosari',               via:'Dapodi',                                freq:'Every 40 min', firstUp:'6:20AM', lastUp:'8:15PM',  firstDn:'7:35AM', lastDn:'9:25PM',  fare:20, type:'regular' },
  { no:'345',  from:'Hinjewadi',         to:'Bhosari',               via:'Wakad, Pimpri',                         freq:'Every 40 min', firstUp:'5:30AM', lastUp:'8:20PM',  firstDn:'6:50AM', lastDn:'10:10PM', fare:28, type:'regular' },
  { no:'346',  from:'Bhosari',           to:'Wagholi',               via:'Ramwadi',                               freq:'Every 35 min', firstUp:'5:30AM', lastUp:'8:20PM',  firstDn:'6:50AM', lastDn:'10:10PM', fare:25, type:'regular' },
  { no:'348',  from:'Nigdi',             to:'Dehugaon',              via:'Pradhikaran, Akurdi',                   freq:'Every 30 min', firstUp:'5:00AM', lastUp:'9:00PM',  firstDn:'6:15AM', lastDn:'9:45PM',  fare:25, type:'regular' },
  { no:'349',  from:'Nigdi',             to:'Pune Station',          via:'Pimpri, Shivajinagar',                  freq:'Every 20 min', firstUp:'4:35AM', lastUp:'11:00PM', firstDn:'5:15AM', lastDn:'11:00PM', fare:22, type:'regular' },
  { no:'350',  from:'Bhosari',           to:'Shikrapur Phata',       via:'Alandi',                                freq:'Every 30 min', firstUp:'5:15AM', lastUp:'10:00PM', firstDn:'6:30AM', lastDn:'11:00PM', fare:28, type:'regular' },
  { no:'352',  from:'Bhosari',           to:'Rajgurunagar',          via:'Alandi',                                freq:'4 trips',      firstUp:'5:45AM', lastUp:'2:45PM',  firstDn:'7:10AM', lastDn:'4:10PM',  fare:35, type:'regular' },
  { no:'354',  from:'Marketyard',        to:'Pimprigaon',            via:'Shivajinagar, Pimpri',                  freq:'Every 35 min', firstUp:'5:05AM', lastUp:'9:40PM',  firstDn:'6:05AM', lastDn:'10:10PM', fare:22, type:'regular' },
  { no:'355',  from:'Chikhali Nageshwar',to:'Dange Chowk',           via:'Kasarwadi, Pimpri',                     freq:'Every 20 min', firstUp:'4:50AM', lastUp:'9:50PM',  firstDn:'5:45AM', lastDn:'11:00PM', fare:18, type:'regular' },
  { no:'356',  from:'Chikhali Nageshwar',to:'Mhalungegaon Padale',   via:'Kasarwadi',                             freq:'Every 30 min', firstUp:'5:00AM', lastUp:'9:40PM',  firstDn:'6:00AM', lastDn:'10:30PM', fare:16, type:'regular' },
  { no:'357',  from:'Pune Station',      to:'Bhosari',               via:'Pimpri',                                freq:'Every 30 min', firstUp:'4:50AM', lastUp:'10:30PM', firstDn:'5:45AM', lastDn:'10:50PM', fare:22, type:'regular' },
  { no:'358',  from:'Bhosari',           to:'Rajgurunagar',          via:'Alandi',                                freq:'Every 35 min', firstUp:'5:20AM', lastUp:'10:05PM', firstDn:'6:15AM', lastDn:'11:15PM', fare:32, type:'regular' },
  { no:'360',  from:'Bhosari',           to:'Alandi',                via:'Dapodi',                                freq:'Every 30 min', firstUp:'5:00AM', lastUp:'9:50PM',  firstDn:'6:30AM', lastDn:'10:30PM', fare:20, type:'regular' },
  { no:'361',  from:'Bhosari',           to:'Alandi',                via:'Dapodi',                                freq:'Every 30 min', firstUp:'5:35AM', lastUp:'9:35PM',  firstDn:'5:35AM', lastDn:'9:55PM',  fare:20, type:'regular' },
  { no:'362',  from:'Bhosari',           to:'Alandi',                via:'Dapodi',                                freq:'Every 30 min', firstUp:'5:20AM', lastUp:'8:35PM',  firstDn:'6:00AM', lastDn:'9:30PM',  fare:20, type:'regular' },
  { no:'363',  from:'Nigdi',             to:'Dattanagar Kiwale',     via:'Pradhikaran',                           freq:'Every 25 min', firstUp:'5:00AM', lastUp:'9:00PM',  firstDn:'6:50AM', lastDn:'9:40PM',  fare:16, type:'regular' },
  { no:'364',  from:'Alandi',            to:'Chakan Ambethan',       via:'Bhosari, Chakan',                       freq:'6 trips',      firstUp:'7:15AM', lastUp:'5:50PM',  firstDn:'8:00AM', lastDn:'6:35PM',  fare:35, type:'regular' },
  { no:'365',  from:'Nigdi',             to:'Mukai Chowk (BRT)',     via:'BRT Corridor',                          freq:'Every 15 min', firstUp:'5:45AM', lastUp:'10:45PM', firstDn:'1:00PM', lastDn:'10:45PM', fare:12, type:'regular' },
  { no:'366',  from:'Samir Lawns Ravet', to:'Nigdi',                 via:'Ravet',                                 freq:'Every 30 min', firstUp:'5:05AM', lastUp:'9:35PM',  firstDn:'6:10AM', lastDn:'12:05AM', fare:14, type:'regular' },
  { no:'367',  from:'Nigdi',             to:'Hinjewadi',             via:'Wakad, Baner',                          freq:'Every 30 min', firstUp:'5:50AM', lastUp:'10:30PM', firstDn:'7:35AM', lastDn:'8:05PM',  fare:25, type:'regular' },
  { no:'368',  from:'Nigdi',             to:'Lonavala',              via:'Chinchwad, Talegaon',                   freq:'4 trips',      firstUp:'6:50AM', lastUp:'8:10AM',  firstDn:'8:00AM', lastDn:'9:40PM',  fare:60, type:'regular' },
  { no:'369',  from:'Nigdi',             to:'Vasuli MIDC',           via:'Pradhikaran',                           freq:'Every 30 min', firstUp:'5:05AM', lastUp:'9:35PM',  firstDn:'5:40AM', lastDn:'10:05PM', fare:16, type:'regular' },
  { no:'371',  from:'Nigdi',             to:'Takave Bhoyregaon',     via:'Maval',                                 freq:'4 trips',      firstUp:'5:20AM', lastUp:'6:40PM',  firstDn:'6:50AM', lastDn:'8:25PM',  fare:35, type:'regular' },
  { no:'372',  from:'Nigdi',             to:'Hinjewadi',             via:'Wakad',                                 freq:'4 trips',      firstUp:'7:05AM', lastUp:'6:25PM',  firstDn:'8:25AM', lastDn:'5:45PM',  fare:22, type:'regular' },
  { no:'373',  from:'Neilsoft Infosys F3',to:'Sangvi',              via:'Hinjewadi, Baner, Aundh',               freq:'4 trips',      firstUp:'6:00AM', lastUp:'4:50PM',  firstDn:'7:20AM', lastDn:'6:15PM',  fare:25, type:'regular' },
  { no:'374',  from:'Nigdi',             to:'Neilsoft Infosys F3',   via:'Wakad, Hinjewadi',                      freq:'Every 35 min', firstUp:'5:55AM', lastUp:'10:55PM', firstDn:'6:20AM', lastDn:'10:35PM', fare:25, type:'regular' },
  { no:'375',  from:'Neilsoft Infosys F3',to:'Nigdi',              via:'Hinjewadi, Wakad',                       freq:'Every 35 min', firstUp:'6:20AM', lastUp:'7:10PM',  firstDn:'7:50AM', lastDn:'8:45PM',  fare:25, type:'regular' },
  { no:'376',  from:'Shewalewadi',       to:'Dehugaon',              via:'Swargate, Katraj, Kothrud',             freq:'6 trips',      firstUp:'6:20AM', lastUp:'5:45PM',  firstDn:'9:30AM', lastDn:'8:45PM',  fare:40, type:'regular' },
  { no:'379',  from:'Manapa',            to:'Pimprigaon',            via:'Pimpri, Bhosari',                       freq:'Every 30 min', firstUp:'5:05AM', lastUp:'9:35PM',  firstDn:'6:00AM', lastDn:'10:35PM', fare:18, type:'regular' },
  { no:'380',  from:'Bhosari',           to:'Hinjewadi',             via:'Pimpri, Wakad',                         freq:'4 trips',      firstUp:'6:45AM', lastUp:'4:25PM',  firstDn:'8:05AM', lastDn:'5:45PM',  fare:28, type:'regular' },
  { no:'381',  from:'Manapa',            to:'Indira College Tathawade',via:'Wakad, Hinjewadi',                    freq:'Every 30 min', firstUp:'6:30AM', lastUp:'8:40PM',  firstDn:'6:45AM', lastDn:'8:15PM',  fare:25, type:'regular' },
  { no:'383',  from:'Sangvi',            to:'Chandkhed',             via:'Aundh',                                 freq:'Special',      firstUp:'12:45PM',lastUp:'12:45PM', firstDn:'6:10AM', lastDn:'6:10AM',  fare:25, type:'regular' },
  { no:'384',  from:'Chikhali Nageshwar',to:'Hinjewadi',             via:'Pimpri, Wakad',                         freq:'Every 30 min', firstUp:'5:35AM', lastUp:'10:40PM', firstDn:'5:45AM', lastDn:'11:05PM', fare:28, type:'regular' },
  // ── NIGHT SERVICE (Ratrani) ──
  { no:'Ratrani 1', from:'Katraj',       to:'Wakdewadi',             via:'Swargate, Deccan',                      freq:'4 trips night', firstUp:'10:40PM',lastUp:'3:55AM',  firstDn:'11:30PM',lastDn:'4:40AM',  fare:30, type:'night' },
  { no:'Ratrani 2', from:'Katraj',       to:'Pune Station',          via:'Swargate, Deccan',                      freq:'4 trips night', firstUp:'11:00PM',lastUp:'3:25AM',  firstDn:'11:50PM',lastDn:'4:10AM',  fare:28, type:'night' },
  { no:'Ratrani 3', from:'Hadapsar',     to:'Swargate',              via:'Bibewadi',                              freq:'4 trips night', firstUp:'10:20PM',lastUp:'3:45AM',  firstDn:'10:50PM',lastDn:'4:15AM',  fare:20, type:'night' },
  { no:'Ratrani 4', from:'Hadapsar',     to:'Pune Station',          via:'Swargate, Camp',                        freq:'4 trips night', firstUp:'10:40PM',lastUp:'4:05AM',  firstDn:'11:20PM',lastDn:'4:35AM',  fare:22, type:'night' },
  { no:'Ratrani 6', from:'Nigdi',        to:'Pune Station (Wakdewadi)',via:'Pimpri, Shivajinagar',                freq:'3 trips night', firstUp:'11:30PM',lastUp:'3:30AM',  firstDn:'12:30AM',lastDn:'4:30AM',  fare:28, type:'night' },
  { no:'Ratrani 7', from:'Pune Station', to:'Kondhawa Gate',         via:'Swargate, Bibewadi',                    freq:'3 trips night', firstUp:'10:00PM',lastUp:'3:45AM',  firstDn:'11:15PM',lastDn:'5:00AM',  fare:22, type:'night' },
  { no:'Ratrani 9', from:'Pune Station', to:'Wagholi',               via:'Yerwada, Ramwadi',                      freq:'3 trips night', firstUp:'12:00AM',lastUp:'4:00AM',  firstDn:'12:50AM',lastDn:'4:45AM',  fare:28, type:'night' },
  // ── METRO FEEDER BUSES ──
  { no:'Metro 2',   from:'Deccan Metro Station',to:'Waraje Malwadi', via:'Kothrud',                               freq:'Every 40 min', firstUp:'8:20AM', lastUp:'7:00PM',  firstDn:'9:05AM', lastDn:'7:50PM',  fare:20, type:'metro-feeder' },
  { no:'Metro 3',   from:'Sutardara',    to:'Warje Malwadi',         via:'Deccan',                                freq:'6 trips',      firstUp:'7:20AM', lastUp:'6:30PM',  firstDn:'8:10AM', lastDn:'7:20PM',  fare:20, type:'metro-feeder' },
  { no:'Metro 12',  from:'Katraj',       to:'Upper Depo',            via:'Swargate, Deccan',                      freq:'Every 30 min', firstUp:'7:00AM', lastUp:'6:50PM',  firstDn:'8:00AM', lastDn:'7:50PM',  fare:18, type:'metro-feeder' },
  { no:'Metro 13',  from:'Upper Depo',   to:'Swargate',              via:'Deccan',                                freq:'Every 30 min', firstUp:'7:40AM', lastUp:'6:40PM',  firstDn:'8:05AM', lastDn:'7:05PM',  fare:18, type:'metro-feeder' },
  { no:'Metro 17',  from:'Hadapsar',     to:'Shivajinagar Civil Court Metro',via:'Ramwadi, Yerwada',             freq:'Every 40 min', firstUp:'8:00AM', lastUp:'7:20PM',  firstDn:'8:30AM', lastDn:'7:50PM',  fare:20, type:'metro-feeder' },
  { no:'Metro 20',  from:'Panchashil Kharadi',to:'Ramwadi Metro',    via:'Kalyani Nagar',                         freq:'4 trips',      firstUp:'8:00AM', lastUp:'5:40PM',  firstDn:'8:30AM', lastDn:'6:10PM',  fare:18, type:'metro-feeder' },
  { no:'Metro 22',  from:'Hadapsar',     to:'Kalyani Nagar Metro',   via:'Ramwadi',                               freq:'Every 40 min', firstUp:'8:00AM', lastUp:'7:00PM',  firstDn:'8:30AM', lastDn:'7:30PM',  fare:16, type:'metro-feeder' },
  { no:'Metro 31',  from:'Nigdi',        to:'Pimpari Metro Station',  via:'Pimpri',                               freq:'Every 40 min', firstUp:'6:30AM', lastUp:'8:00PM',  firstDn:'7:45AM', lastDn:'8:45PM',  fare:14, type:'metro-feeder' },
  { no:'Metro 32',  from:'Nigdi Bhakti Shakti',to:'Nashik Phata Metro',via:'Pimpri',                             freq:'6 trips',      firstUp:'8:15AM', lastUp:'6:00PM',  firstDn:'9:00AM', lastDn:'6:45PM',  fare:12, type:'metro-feeder' },
  { no:'Metro 40',  from:'Dange Chowk',  to:'Pimpari Metro (Vartul)',via:'Pradhikaran',                           freq:'Every 30 min', firstUp:'7:30AM', lastUp:'7:00PM',  firstDn:'8:00AM', lastDn:'7:30PM',  fare:12, type:'metro-feeder' },
  { no:'B1',        from:'Nashik Phata Metro',to:'Dighi',            via:'Kasarwadi',                             freq:'4 trips',      firstUp:'5:40AM', lastUp:'3:00PM',  firstDn:'1:45PM', lastDn:'10:40PM', fare:14, type:'metro-feeder' },
  // ── ATAL SEWA (City Circular) ──
  { no:'2-Atal',    from:'Shivajinagar', to:'Swargate',              via:'Deccan, Mandai',                        freq:'Every 16 min', firstUp:'5:00AM', lastUp:'10:30PM', firstDn:'5:32AM', lastDn:'11:00PM', fare:10, type:'atal' },
  { no:'3-Atal',    from:'Swargate',     to:'Shivajinagar',          via:'Mandai, Deccan',                        freq:'Every 20 min', firstUp:'6:00AM', lastUp:'8:45PM',  firstDn:'7:15AM', lastDn:'9:45PM',  fare:10, type:'atal' },
  { no:'4-Atal',    from:'Swargate Station',to:'Swargate (Vartul)',  via:'Circular',                              freq:'Every 15 min', firstUp:'5:40AM', lastUp:'10:55PM', firstDn:'6:15AM', lastDn:'11:30PM', fare:10, type:'atal' },
  { no:'5-Atal',    from:'Swargate',     to:'Pune Station',          via:'Deccan, Camp',                          freq:'Every 8 min',  firstUp:'4:35AM', lastUp:'10:30PM', firstDn:'5:05AM', lastDn:'11:00PM', fare:10, type:'atal' },
  { no:'6-Atal',    from:'Deccan',       to:'Pulgate',               via:'Shivajinagar, Camp',                    freq:'Every 15 min', firstUp:'6:20AM', lastUp:'10:00PM', firstDn:'7:00AM', lastDn:'9:40AM',  fare:10, type:'atal' },
  { no:'7-Atal',    from:'Deccan',       to:'Station',               via:'Shivajinagar, Camp',                    freq:'Every 20 min', firstUp:'6:20AM', lastUp:'7:00PM',  firstDn:'7:00AM', lastDn:'7:40PM',  fare:10, type:'atal' },
  { no:'8-Atal',    from:'Deccan',       to:'Pune Station',          via:'Shivajinagar',                          freq:'Every 20 min', firstUp:'6:10AM', lastUp:'7:00PM',  firstDn:'6:35AM', lastDn:'8:30PM',  fare:10, type:'atal' },
  { no:'9-Atal',    from:'Station',      to:'Deccan',                via:'Shivajinagar',                          freq:'Every 20 min', firstUp:'6:35AM', lastUp:'8:45PM',  firstDn:'6:45AM', lastDn:'7:15PM',  fare:10, type:'atal' },
  // ── KATRAJ AREA ──
  { no:'K11',  from:'Katraj',            to:'Kolewadi',              via:'Ambegaon',                              freq:'6 trips',      firstUp:'6:30AM', lastUp:'6:20PM',  firstDn:'7:05AM', lastDn:'7:00PM',  fare:18, type:'regular' },
  { no:'K12',  from:'Katraj',            to:'Narhegaon',             via:'Kondhwa',                               freq:'Every 30 min', firstUp:'5:50AM', lastUp:'10:20PM', firstDn:'6:25AM', lastDn:'10:40PM', fare:18, type:'regular' },
  { no:'K13',  from:'Katraj',            to:'JSPM Narhegaon',        via:'Ambegaon',                              freq:'Every 30 min', firstUp:'6:10AM', lastUp:'10:50PM', firstDn:'6:25AM', lastDn:'10:05PM', fare:18, type:'regular' },
  { no:'K14',  from:'Katraj',            to:'Gujarwadi',             via:'Ambegaon, Dive',                        freq:'Every 35 min', firstUp:'6:20AM', lastUp:'9:10PM',  firstDn:'6:50AM', lastDn:'9:55PM',  fare:20, type:'regular' },
  { no:'K16',  from:'Katraj',            to:'Yewalewadi',            via:'Kondhwa',                               freq:'Every 30 min', firstUp:'6:10AM', lastUp:'10:50PM', firstDn:'6:40AM', lastDn:'10:00PM', fare:18, type:'regular' },
  { no:'K18',  from:'Katraj',            to:'Waghajainagar',         via:'Ambegaon',                              freq:'Every 35 min', firstUp:'8:00AM', lastUp:'9:50AM',  firstDn:'6:10AM', lastDn:'8:50AM',  fare:18, type:'regular' },
  { no:'K21',  from:'Vanaz Metro',       to:'Bavadhan Gaon (Vartul)',via:'Bavadhan',                              freq:'Circular',     firstUp:'6:00AM', lastUp:'9:50PM',  firstDn:'6:00AM', lastDn:'9:50PM',  fare:12, type:'regular' },
  // ── HADAPSAR AREA ──
  { no:'H3',   from:'Hadapsar',          to:'Saswad Road Rly Station',via:'Solapur Road',                         freq:'Every 30 min', firstUp:'5:40AM', lastUp:'9:00PM',  firstDn:'6:30AM', lastDn:'9:30PM',  fare:16, type:'regular' },
  { no:'H8',   from:'Hadapsar',          to:'Fursungi',              via:'Hadapsar Bypass',                       freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:50PM',  firstDn:'6:00AM', lastDn:'9:50PM',  fare:12, type:'regular' },
  { no:'H9',   from:'Hadapsar',          to:'Sanket Vihar Fursungi', via:'Fursungi',                              freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:50PM',  firstDn:'6:00AM', lastDn:'10:20PM', fare:12, type:'regular' },
  { no:'H11',  from:'Hadapsar',          to:'JSPM School Adarshanagar',via:'Kondhwa',                             freq:'Every 30 min', firstUp:'6:00AM', lastUp:'7:50PM',  firstDn:'6:40AM', lastDn:'8:20PM',  fare:16, type:'regular' },
  // ── PIMPRI AREA ──
  { no:'P12',  from:'Pimpri Road',       to:'Kalewadi Phata',        via:'Pradhikaran',                           freq:'Every 20 min', firstUp:'5:10AM', lastUp:'4:35AM',  firstDn:'6:20AM', lastDn:'10:00PM', fare:12, type:'regular' },
  { no:'P13',  from:'Walhekarwadi',      to:'Pimpri Metro Station',  via:'Chinchwad',                             freq:'Every 30 min', firstUp:'5:30AM', lastUp:'9:00PM',  firstDn:'6:30AM', lastDn:'9:00PM',  fare:12, type:'regular' },
  // ── NIGDI AREA ──
  { no:'N4A',  from:'Nigdi',             to:'Rupi Nagar',            via:'Akurdi',                                freq:'Every 30 min', firstUp:'7:00AM', lastUp:'7:15PM',  firstDn:'7:30AM', lastDn:'7:45PM',  fare:14, type:'regular' },
  { no:'N14',  from:'Chinchwadgaon',     to:'Symbiosis Kivale',      via:'Wakad, Hinjewadi',                      freq:'5 trips',      firstUp:'8:00AM', lastUp:'5:40PM',  firstDn:'8:45AM', lastDn:'6:40PM',  fare:22, type:'regular' },
  { no:'N15',  from:'Khandoba Maal',     to:'Chikhali Nageshwar',    via:'Bhosari',                               freq:'Every 30 min', firstUp:'5:00AM', lastUp:'10:35PM', firstDn:'5:55AM', lastDn:'11:15PM', fare:16, type:'regular' },
  { no:'N16',  from:'Deccan Gymkhana',   to:'Niljyoti',              via:'Shivajinagar, Ramwadi',                 freq:'Every 30 min', firstUp:'6:00AM', lastUp:'8:40PM',  firstDn:'6:30AM', lastDn:'9:15PM',  fare:22, type:'regular' },
];

const TYPE_LABELS = {
  'regular':      { label: 'Regular',      color: '#22c1c3', bg: 'rgba(34,193,195,0.1)' },
  'night':        { label: 'Night (Ratrani)',color: '#8b79f6', bg: 'rgba(139,121,246,0.1)' },
  'metro-feeder': { label: 'Metro Feeder', color: '#42d3a7', bg: 'rgba(66,211,167,0.1)' },
  'atal':         { label: 'Atal Sewa',    color: '#f5b84b', bg: 'rgba(245,184,75,0.1)'  },
};

export default function PMPL() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [tab, setTab] = useState('routes');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ROUTES.filter(r => {
      const matchType = typeFilter === 'all' || r.type === typeFilter;
      if (!matchType) return false;
      if (!q) return true;
      return (
        r.no.toLowerCase().includes(q) ||
        r.from.toLowerCase().includes(q) ||
        r.to.toLowerCase().includes(q) ||
        r.via.toLowerCase().includes(q)
      );
    });
  }, [search, typeFilter]);

  const stats = useMemo(() => ({
    total:   ROUTES.length,
    regular: ROUTES.filter(r => r.type === 'regular').length,
    night:   ROUTES.filter(r => r.type === 'night').length,
    feeder:  ROUTES.filter(r => r.type === 'metro-feeder').length,
    atal:    ROUTES.filter(r => r.type === 'atal').length,
  }), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        {[
          { label: 'Total Routes',    value: stats.total,   color: '#22c1c3' },
          { label: 'Regular Routes',  value: stats.regular, color: '#42d3a7' },
          { label: 'Night (Ratrani)', value: stats.night,   color: '#8b79f6' },
          { label: 'Metro Feeders',   value: stats.feeder,  color: '#f5b84b' },
          { label: 'Atal Sewa',       value: stats.atal,    color: '#ef6461' },
        ].map(s => (
          <div key={s.label} className="glass-card" style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Info Banner ── */}
      <div style={{
        padding: '14px 20px',
        borderRadius: 10,
        background: 'rgba(34,193,195,0.06)',
        border: '1px solid rgba(34,193,195,0.2)',
        fontSize: 13, color: 'var(--text-secondary)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--primary)' }}>PMPL (Pune Mahanagar Parivahan Mahamandal Ltd)</strong> operates{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{stats.total}+ routes</strong> across Pune, Pimpri-Chinchwad and surrounding areas.{' '}
        Operating hours: <strong style={{ color: 'var(--text-primary)' }}>4:30 AM – 12:00 AM</strong> (varies by route).{' '}
        Night Ratrani buses run on select routes from <strong style={{ color: '#8b79f6)' }}>10:00 PM – 5:00 AM</strong>.{' '}
        Helpline: <strong style={{ color: 'var(--primary)' }}>020-24507006</strong>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.3)', padding: 4, borderRadius: 10, width: 'fit-content', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { id: 'routes',  label: 'All Routes' },
          { id: 'passes',  label: 'Passes & Fares' },
          { id: 'info',    label: 'Travel Info' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '8px 18px', borderRadius: 8, border: 'none',
            background: tab === t.id ? 'var(--surface)' : 'transparent',
            color: tab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
            fontFamily: 'inherit', fontWeight: tab === t.id ? 700 : 400,
            fontSize: 13, cursor: 'pointer', transition: 'all 0.18s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ══ TAB: ROUTES ══ */}
      {tab === 'routes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="input-field"
              style={{ maxWidth: 340 }}
              placeholder="Search route no., area, or destination..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'all',          label: `All (${ROUTES.length})` },
                { id: 'regular',      label: `Regular (${stats.regular})` },
                { id: 'night',        label: `Night (${stats.night})` },
                { id: 'metro-feeder', label: `Metro Feeder (${stats.feeder})` },
                { id: 'atal',         label: `Atal Sewa (${stats.atal})` },
              ].map(f => (
                <button key={f.id} onClick={() => setTypeFilter(f.id)} style={{
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: `1px solid ${typeFilter === f.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  background: typeFilter === f.id ? 'rgba(34,193,195,0.12)' : 'rgba(0,0,0,0.2)',
                  color: typeFilter === f.id ? 'var(--primary)' : 'var(--text-secondary)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.18s', whiteSpace: 'nowrap',
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Showing {filtered.length} route{filtered.length !== 1 ? 's' : ''}
          </div>

          {/* Route List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(route => {
              const typeInfo = TYPE_LABELS[route.type];
              const isOpen = expanded === route.no;
              return (
                <div
                  key={route.no}
                  onClick={() => setExpanded(isOpen ? null : route.no)}
                  className="glass-card"
                  style={{
                    padding: 0,
                    cursor: 'pointer',
                    border: `1px solid ${isOpen ? 'rgba(34,193,195,0.3)' : 'var(--border-subtle)'}`,
                    background: isOpen ? 'rgba(34,193,195,0.04)' : 'rgba(18,31,49,0.72)',
                    transition: 'all 0.18s',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.borderColor = 'var(--border-default)'; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                >
                  {/* Main row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px' }}>
                    {/* Route No */}
                    <div style={{
                      width: 54, height: 54, borderRadius: 10, flexShrink: 0,
                      background: typeInfo.bg,
                      border: `1px solid ${typeInfo.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'monospace', fontWeight: 800,
                      color: typeInfo.color,
                      fontSize: route.no.length > 5 ? 10 : route.no.length > 3 ? 12 : 16,
                      textAlign: 'center', lineHeight: 1.2, padding: 2,
                    }}>
                      {route.no}
                    </div>

                    {/* Route info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 420 }}>
                          {route.from} &rarr; {route.to}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12, background: typeInfo.bg, color: typeInfo.color, border: `1px solid ${typeInfo.color}30`, whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {typeInfo.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Via: {route.via}</div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Frequency</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{route.freq}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Min Fare</div>
                        <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 800, color: '#42d3a7' }}>&#8377;{route.fare}</div>
                      </div>
                      <div style={{
                        fontSize: 18, color: 'var(--text-muted)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.2s',
                      }}>&#8964;</div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isOpen && (
                    <div style={{
                      borderTop: '1px solid var(--border-subtle)',
                      padding: '16px 18px',
                      animation: 'fade-in 0.2s ease',
                      background: 'rgba(0,0,0,0.15)',
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 14 }}>
                        {[
                          { label: 'First Bus (Up)',   value: route.firstUp },
                          { label: 'Last Bus (Up)',    value: route.lastUp },
                          { label: 'First Bus (Down)', value: route.firstDn },
                          { label: 'Last Bus (Down)',  value: route.lastDn },
                        ].map(item => (
                          <div key={item.label} style={{
                            padding: '10px 14px',
                            borderRadius: 8,
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid var(--border-subtle)',
                          }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{item.label}</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Route: </span>
                          {route.from} &rarr; <em style={{ color: 'var(--text-muted)' }}>via {route.via}</em> &rarr; {route.to}
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                          <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(34,193,195,0.1)', border: '1px solid rgba(34,193,195,0.2)', fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>
                            Freq: {route.freq}
                          </div>
                          <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(66,211,167,0.1)', border: '1px solid rgba(66,211,167,0.2)', fontSize: 12, fontWeight: 700, color: '#42d3a7' }}>
                            From &#8377;{route.fare}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '60px 20px',
                borderRadius: 14, border: '1px dashed var(--border-subtle)',
                color: 'var(--text-muted)',
              }}>
                <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>&#128652;</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>No routes found</div>
                <div style={{ fontSize: 13 }}>Try searching by route number, area name, or destination</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ TAB: PASSES & FARES ══ */}
      {tab === 'passes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Fare Structure */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Official Fare Structure</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>PMPL fares are distance-based. Minimum fare ₹10 (Atal Sewa). Smart Card gives 5% discount.</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { range: 'Up to 3 km',   fare: '₹10–15', color: '#42d3a7' },
                { range: '3–8 km',       fare: '₹15–22', color: '#22c1c3' },
                { range: '8–15 km',      fare: '₹22–28', color: '#f5b84b' },
                { range: '15–25 km',     fare: '₹28–35', color: '#ef6461' },
                { range: '25+ km',       fare: '₹35–60', color: '#8b79f6' },
                { range: 'Atal Sewa',    fare: '₹10 flat',color: '#f5b84b' },
              ].map(f => (
                <div key={f.range} style={{
                  padding: '16px 20px', borderRadius: 10, textAlign: 'center',
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', minWidth: 110,
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 800, color: f.color, marginBottom: 4 }}>{f.fare}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{f.range}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Passes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { name: 'Daily Pass',         price: '₹50',   desc: 'Unlimited rides · 1 day · All regular routes', color: '#22c1c3', icon: '📅' },
              { name: 'Weekly Pass',        price: '₹280',  desc: 'Unlimited rides · 7 days · All regular routes', color: '#42d3a7', icon: '🗓️' },
              { name: 'Monthly Pass',       price: '₹700',  desc: 'Unlimited · 30 days · All PMPL routes',         color: '#f5b84b', icon: '📆', popular: true },
              { name: 'Student Pass',       price: '₹350',  desc: 'Monthly · Valid student ID required',           color: '#8b79f6', icon: '🎓' },
              { name: 'Senior Citizen',     price: '50% off',desc: '60+ age · Applicable on all routes',           color: '#42d3a7', icon: '👴' },
              { name: 'Smart Card',         price: '₹100',  desc: '5% discount every ride · Refundable deposit',  color: '#22c1c3', icon: '💳' },
            ].map(p => (
              <div key={p.name} className="glass-card" style={{
                padding: 22, position: 'relative', overflow: 'hidden',
                border: `1px solid ${p.popular ? `${p.color}60` : 'var(--border-subtle)'}`,
                background: p.popular ? `${p.color}08` : undefined,
              }}>
                {p.popular && (
                  <div style={{ position: 'absolute', top: -1, right: 14, background: p.color, color: '#000', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: '0 0 8px 8px' }}>
                    BEST VALUE
                  </div>
                )}
                <div style={{ fontSize: 26, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{p.desc}</div>
                <button className="btn-secondary btn-sm" style={{ width: '100%', fontSize: 12 }}>
                  Get {p.name}
                </button>
              </div>
            ))}
          </div>

          {/* How to Buy */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>How to Buy Tickets / Passes</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
              {[
                { icon: '🏢', method: 'PMPL Bus Depot',   desc: 'Pay at any PMPL depot counter. Cash & card accepted.' },
                { icon: '🚌', method: 'On the Bus',       desc: 'Pay conductor directly. Exact change preferred.' },
                { icon: '📱', method: 'Chalo App',        desc: 'QR ticket on phone. UPI / card payment.' },
                { icon: '💳', method: 'Smart Card',       desc: 'Tap & ride. Buy at depots. Recharge anywhere.' },
              ].map(m => (
                <div key={m.method} style={{ padding: 16, borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{m.method}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: TRAVEL INFO ══ */}
      {tab === 'info' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>

          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Operating Hours</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Regular Buses',    hours: '5:00 AM – 11:30 PM',   note: 'Most routes' },
                { label: 'Atal Sewa',        hours: '4:35 AM – 11:00 PM',   note: 'City circular routes' },
                { label: 'Ratrani (Night)',   hours: '10:00 PM – 5:00 AM',   note: '9 night routes' },
                { label: 'Metro Feeder',      hours: '7:00 AM – 9:30 PM',    note: 'Metro station feeders' },
              ].map(item => (
                <div key={item.label} style={{ padding: '14px 18px', borderRadius: 10, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>{item.hours}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          {[
            { q: 'What is the minimum bus fare?',          a: '₹10 on Atal Sewa routes. ₹12–15 on short regular routes. Fares depend on distance.' },
            { q: 'Do PMPL buses operate on Sundays?',      a: 'Yes, all routes operate 7 days a week including Sundays and most public holidays.' },
            { q: 'How does the Smart Card work?',          a: 'Purchase a Smart Card for ₹100 deposit (refundable). Load balance at depots or online. Get 5% discount on every ride. Tap card on the validator while boarding.' },
            { q: 'What are Ratrani (Night) buses?',        a: '9 night bus routes operating 10 PM to 5 AM connecting key corridors: Katraj, Hadapsar, Nigdi, Wagholi and Station. Fare ~₹28–30.' },
            { q: 'What is Atal Sewa?',                     a: 'AC and non-AC city circular buses connecting Shivajinagar, Swargate, Deccan, and Station at a flat ₹10 fare. High frequency every 8–20 minutes.' },
            { q: 'What are Metro Feeder buses?',           a: 'Buses that connect residential areas to nearest Metro stations. Fare ₹12–20. Integrated ticketing in pilot phase.' },
            { q: 'Is there a student concession?',         a: 'Yes. Student monthly pass at ₹350. Valid school/college ID required. Available at all PMPL depot offices.' },
            { q: 'PMPL helpline number?',                  a: '020-24507006 (General) | WhatsApp: 7045009780 | Complaint portal: pmplpune.com' },
            { q: 'Where can I track buses live?',          a: 'Use the Chalo App (iOS/Android) for real-time GPS tracking of most PMPL buses.' },
          ].map((item, i) => {
            const [open, setOpen] = React.useState(false);
            return (
              <div key={i}
                onClick={() => setOpen(!open)}
                style={{
                  borderRadius: 10,
                  border: `1px solid ${open ? 'rgba(34,193,195,0.3)' : 'var(--border-subtle)'}`,
                  background: open ? 'rgba(34,193,195,0.04)' : 'rgba(18,31,49,0.72)',
                  cursor: 'pointer', overflow: 'hidden', transition: 'all 0.18s',
                }}>
                <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: open ? 700 : 500, color: open ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{item.q}</span>
                  <span style={{ fontSize: 18, color: 'var(--primary)', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0)', flexShrink: 0 }}>+</span>
                </div>
                {open && (
                  <div style={{ padding: '0 18px 14px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, borderTop: '1px solid var(--border-subtle)', paddingTop: 12, animation: 'fade-in 0.2s ease' }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}

          <div style={{
            marginTop: 8, padding: '16px 20px', borderRadius: 10,
            background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-subtle)',
            display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
          }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Need help?</span>
            <a href="tel:02024507006" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: 'rgba(66,211,167,0.08)', border: '1px solid rgba(66,211,167,0.2)', color: '#42d3a7', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
              020-24507006
            </a>
            <a href="https://pmplpune.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: 'rgba(34,193,195,0.08)', border: '1px solid rgba(34,193,195,0.2)', color: 'var(--primary)', textDecoration: 'none', fontSize: 13 }}>
              pmplpune.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}