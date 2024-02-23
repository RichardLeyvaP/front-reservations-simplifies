<template>
  <v-row class="mt-6">

    <v-col cols="3" class="ml-12">
      <v-card elevation="3">
        <v-list subheader two-line class="black">

          <v-list-item v-for="file in files" :key="file.title">
            <v-list-item-avatar>
              <v-img src="@/assets/hernandez_big.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content class="white--text">
              <v-list-item-title>{{ file.title }}</v-list-item-title>

<v-list-item-subtitle class="white--text">{{ file.subtitle }}</v-list-item-subtitle>

            </v-list-item-content>
          </v-list-item>
        </v-list>


        <v-row class="mt-2 ">
          <v-col>
            <v-list-item>
              <v-select v-model="selected_branch" :items="branches" item-text="name" item-value="id"
                label="Selecciona una sucursal" outlined return-object @change="chargeCalendarsBranches()"
                dense></v-select>
            </v-list-item>
          </v-col>
        </v-row>
        <v-divider v-if="selected_branch"></v-divider>
        <v-row v-if="selected_branch">

          <v-col>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange lighten-2">
                    mdi-map-marker
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Dirección</v-list-item-title>
                  <v-list-item-subtitle>{{ selected_branch.address }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-col>
        </v-row>

        <v-divider v-if="selected_branch"></v-divider>
        <v-row v-if="selected_branch">

          <v-col>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange lighten-2">
                    mdi-phone
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Teléfono</v-list-item-title>
                  <v-list-item-subtitle>{{ selected_branch.phone }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-col>
        </v-row>

        <v-divider v-if="selected_branch"></v-divider>
        <v-row v-if="selected_branch">

          <v-col>

            <v-list class="transparent">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="orange lighten-2">
                    mdi-timer
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Horario</v-list-item-title>

                </v-list-item-content>
              </v-list-item>
              <v-list class="transparent">
                <v-list-item v-for="(day, index) in calendars_branches" :key="index">
                  <v-list-item-title>{{ day.day }}</v-list-item-title>
                  <v-list-item-subtitle class="text-right" v-if="day.start_time">

                    {{ day.start_time }} - {{ day.closing_time }}


                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-right" v-else>
                    <v-chip>
                      <strong> Cerrado</strong>
                    </v-chip>

                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-list>

          </v-col>
        </v-row>

        <v-divider></v-divider>


      </v-card>
    </v-col>

    <v-col cols="8" class="pr-7 mr-2">
      <v-card elevation="4">
        <v-toolbar color="orange lighten-2">
          <v-row align="center">
            <v-col cols="12" md="4" class="grow ml-4">
              <span class="text-subtitle-1"> <strong>Formulario de Reservas</strong></span>
            </v-col>
            <v-col cols="12" md="4" class="mr-12"></v-col>
            <v-col cols="12" md="3" class="pl-12 ">


            </v-col>

          </v-row>

        </v-toolbar>

        <v-stepper v-model="e1">

          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" color="orange lighten-2">
              Servicios
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" color="orange lighten-2">
              Profesionales
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3" color="orange lighten-2">
              Fecha
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4" :complete="e1 > 4" color="orange lighten-2">
              Datos Personales
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" id="1">

              <div v-if="steep1Visible">
                <v-row class="">
                  <v-col cols="12">

                    <v-card class="mx-auto mt-2 ml-2 mr-2" elevation="4">
                      <v-list two-line>
                        <v-list-item-group v-model="selected_services" active-class="orange--text" multiple>
                          <template v-for="(item, index) in services">
                            <v-list-item :key="item.title" :value="item.id">
                              <template v-slot:default="{ active }">
                                <v-list-item-avatar elevation="4">
                                  <v-img :src="'http://127.0.0.1:8000/api/images/'+item.image_service" alt="Avatar"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <h6>
                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                  </h6>
                                  <v-list-item-subtitle class="text--primary">
    {{ item.service_comment }}
</v-list-item-subtitle>
                                  <v-list-item-subtitle class="text--primary">

                                    <v-btn x-small color="orange lighten-2">

                                      {{ item.duration_service }}
                                      minutos
                                    </v-btn>
                                  </v-list-item-subtitle>


                                </v-list-item-content>

                                <v-list-item-action>
                                  <h5>
                                   {{ item.price_service }} CLP
                                  </h5>

                                  <v-icon class="mb-2" v-if="!active" color="grey lighten-1">
                                    mdi-checkbox-blank-circle-outline
                                  </v-icon>

                                  <v-icon class="mb-2" v-else color="orange lighten-2 ">
                                    mdi-checkbox-marked-circle
                                  </v-icon>
                                </v-list-item-action>
                              </template>
                            </v-list-item>

                            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-card>

                  </v-col>

                </v-row>

                <v-divider class="pt-4 mb-4"></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="orange lighten-2" @click="e1 = 2">
                  Continuar
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2" v-if="professionals.length > 0">
              <div v-if="steep2Visible">
                <v-row>
                  <v-col cols="12">

                    <v-card class="mx-auto mt-2 ml-2 mr-2">


                      <v-list two-line>
                        <v-list-item-group v-model="selected_professional" return-object active-class="warning--text">
                          <template v-for="(item, index) in professionals" >
                            <v-list-item :key="item.title" :value="item.id">
                              <template v-slot:default="{ active }">
                                <v-list-item-avatar>
                                  <v-img :src="'http://127.0.0.1:8000/api/images/'+item.image_url" alt="Avatar"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title> <strong>{{ item.name }} {{ item.surname }} {{ item.second_surname
                                  }}</strong> </v-list-item-title>


                                </v-list-item-content>

                                <v-list-item-action>


                                  <v-icon v-if="!active" color="grey lighten-1">
                                    mdi-checkbox-blank-circle-outline
                                  </v-icon>

                                  <v-icon v-else color="yellow darken-3">
                                    mdi-checkbox-marked-circle
                                  </v-icon>
                                </v-list-item-action>
                              </template>
                            </v-list-item>

                            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-card>

                    <v-divider class="pt-4 mb-4"></v-divider>
                  </v-col>

                </v-row>

                <v-btn class="mr-2" color="orange lighten-2" @click="e1 = 1">
                  Volver
                </v-btn>

                <v-btn color="orange lighten-2" @click="e1 = 3">
                  Continuar
                </v-btn>
              </div>

            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row>

                <v-col cols="12" sm="4" class="mt-2">
                  <v-card class="mx-auto mt-2 ml-2 mr-2">
                    <v-date-picker ref="picker" :events="arrayEvents" event-color="green lighten-1"
                      @change="divideInterval()" v-model="date" color="orange lighten-2" elevation="6" locale="es-Es"
                      :min="new Date(
                        Date.now() -
                        new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                        " full-width></v-date-picker>
                  </v-card>


                </v-col>
                <v-col cols="12" sm="8" v-if="intervals.length > 0">
                  <v-card elevation="4">


                    <h5 class="mt-5 pt-2 pl-3"> A continuación se muestran los horarios disponibles para la fecha
                      {{ date }}</h5>


                    <v-card-text>
                      <v-chip-group v-model="selected_interval" active-class="orange lighten-2 white--text" column>
        <v-chip label v-for="inter in intervals" :key="inter.id" :disabled="isIntervalDisabled(inter.time_star)">
          {{ inter.time_star }}
        </v-chip>
      </v-chip-group>
                    </v-card-text>

                  </v-card>
                </v-col>
              </v-row>
              <v-divider class="pt-4 mt-4"></v-divider>

              <v-btn color="orange lighten-2" class="mr-2" @click="e1 = 2">
                Volver
              </v-btn>



              <v-btn color="orange lighten-2" @click="e1 = 4">
                Continuar
              </v-btn>

            </v-stepper-content>


            <v-stepper-content step="4">
     

      
                  <v-form ref="form" lazy-validation>
                    <v-row>
                    <v-col cols="12" md="4" class="mt-2">
                    <v-text-field v-model="name_client" :counter="50" :rules="nameRules" label="Nombre" outlined
                      required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" class="mt-2">
                    <v-text-field v-model="surname_client" :counter="50" :rules="surname_client_Rules" label="Apellido Paterno" outlined
                      required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" class="mt-2">
                    <v-text-field v-model="second_surname" :counter="50" :rules="second_surname_Rules" label="Apellido Materno" outlined
                      required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-2">
                    <v-text-field v-model="phone_client" :rules="phoneRules" label="Teléfono" outlined required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-2">
                    <v-text-field v-model="email_client" :rules="emailRules" label="Correo Electrónico" outlined
                      required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" >
                    <v-checkbox v-model="checkbox" color="orange lighten-2"
                      :rules="[v => !!v || 'You must agree to continue!']" label="Términos y condiciones"
                      required></v-checkbox>
                    </v-col>
                    </v-row>

                  </v-form>

            

         
              <v-divider class="pt-4 mt-4"></v-divider>

              <v-btn color="orange lighten-2" class="mr-2" @click="e1 = 3">
                Volver
              </v-btn>



              <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange lighten-2"
            v-bind="attrs"
            v-on="on"
          >Reservar</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="orange lighten-2"
              dark
            >Datos completados</v-toolbar>
            <v-card-text>
              <div class="pa-12">{{ message }}
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn          
              
              @click="dialog.value = false"
              >Cancelar</v-btn>
              <v-btn
              color="orange lighten-2"
              
              
                @click="send()"
              >Reservar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

            </v-stepper-content>


          </v-stepper-items>
        </v-stepper>

      </v-card>



    </v-col>
  </v-row>
</template>

<script>

import axios from "axios";


export default {
  name: 'ReserveView',

  data: () => ({
    // Agrega la lógica proporcionada
  disabledIntervals: [],
message:"Los datos para realizar la reserva están completos. Se enviará correo electrónico con los datos de la reserva",
    checkbox:false,
    name_client:"",
    email_client:"",
    phone_client:"",
    selected_interval:"",
    arrayEvents: null,
    e1: 1,
    cb: '',
    visible_steep1: false,
    dayOfWeek: [],
   items:[],
    selected_services: [],   
    intervalSelected: [],
    intervals: [],
    countInterval: 0,

    surname_client:"",
    second_surname:"",

    nameRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 50) || 'El nombre no debe exceder de 50 caracteres',
      ],

      surname_client_Rules: [
        v => !!v || 'El Apellido Paterno es requerido',
        v => (v && v.length <= 50) || 'El Apellido Paterno no debe exceder de 50 caracteres',
      ],

      second_surname_Rules: [
        v => !!v || 'El Apellido Materno es requerido',
        v => (v && v.length <= 50) || 'El Apellido Materno no debe exceder de 50 caracteres',
      ],
    
      emailRules: [
        v => !!v || 'El Correo es requerido',
        v => /.+@.+\..+/.test(v) || 'Correo electrónico no válido',
      ],

      phoneRules: [
        v => !!v || 'El Teléfono es requerido',
     
      ],

    dayOK: "",

    calendars_branches: [],
    selected_professional: "",
    date: "",
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mensual',
      week: 'Semanal',
      day: 'Diario',

    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    //  events: [],
    colors: ['grey'],
    names: ['No Disponible'],




    professionals: [
      /* { id: 1, name: 'Juan Pérez Gómez ', color: 'blue' },
       { id: 2, name: 'Norma Elisa Gunther', color: 'blue' },
       { id: 3, name: 'María Novoa Lao', color: 'blue' },*/
    ],

    time: 0,
    selectedServices: [],
    services: [/*
      { id: 1, name: 'Corte de pelo', tiempo: 30, professionals: [1, 2] },
      { id: 2, name: 'Afeitado', tiempo: 20, professionals: [1, 3] },
      { id: 3, name: 'Lavado de cabello', tiempo: 15, professionals: [2, 3] },
      { id: 4, name: 'Barba completa', tiempo: 25, professionals: [1, 2, 3] },*/
      // Agrega más servicios con su tiempo estimado y profesionales aquí
    ],

    selected_branch: 0,
    branches: [
    ],
    reservedTime: [
    ],


    files: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: 'Negocio',
        title: 'Barberías Hernánez',
      },

    ],

    select: [],


    totalDuration: 0,


    totalTime: 0,

  }),
  mounted() {
    
    //this.$refs.calendar.checkChange()
    this.chargeBranches()
    this.arrayEvents = [...Array(1)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)


      return "2023-11-24"
    })

  },

  computed: {


    steep1Visible() {
      return this.services.length > 0
    },

    steep2Visible() {
      return this.professionals.length > 0
    }
    ,
    getDayOfWeek() {


      var Xmas95 = new Date(this.date);
      var weekday = Xmas95.getDay();
      var day = this.dayOfWeek.find((item) => item.id == weekday)

      return day ? day.value : "";

    }

    /*
        getAvailableProfessionals() {
          if (this.selectedServices.length === 0) {
            return this.professionals; // Si no se selecciona ningún servicio, mostrar todos los profesionales
          } else {
            const availableProfessionals = this.professionals.filter((professional) => {
              return this.selectedServices.every((serviceId) => {
                const service = this.services.find((s) => s.id === serviceId);
                return service.professionals.includes(professional.id);
              });
            });
            return availableProfessionals;
          }
        },*/
  },

  methods: {
    isIntervalDisabled(time) {
    // Aquí puedes agregar la lógica para desactivar ciertos horarios.
    // Por ejemplo, si deseas desactivar los horarios '10:00' y '11:00':
    return this.disabledIntervals.includes(time);
  },
    send()
    {
      //this.totalTimeServices()
    
      
      let request = {
        start_time:this.intervals[this.selected_interval].time_star,
        name_client: this.name_client,
        surname_client:this.surname_client,
        second_surname:this.second_surname,
        email_client: this.email_client,
        phone_client: this.phone_client,
        
        professional_id: this.selected_professional,
        branch_id: this.selected_branch.id,
        data: this.date,
        reservation_time: this.totalTime,
        services: this.selected_services,
      
      }

      console.log(request);

      // Realiza la solicitud GET con Axios y pasa los parámetros
      axios.post('http://127.0.0.1:8000/api/reservation_store',  request )
        .then(response => {
          // Maneja la respuesta de la solicitud aquí
        this.message=response.data.msg

        setTimeout(() => {
        // Redirige a la URL externa deseada
        window.location.href = 'https://barberiahernandez.com/barber_backend/web/app_dev.php/reservation';
      }, 3000); 
              })
        .catch(error => {
          // Maneja cualquier error que pueda ocurrir durante la solicitud
          console.error('Error al hacer la solicitud:', error);
        });



    },

    customAllowedDates(date) {
      // Lógica para deshabilitar el 15 de cada mes
      const disabledDay = 15;  

      // Devuelve true si el día no es el día a deshabilitar
      return date.getDate() !== disabledDay;   
    },

    getDayOfWeekOK() {


      var Xmas95 = new Date(this.date);
      console.log(Xmas95);
      var weekday = Xmas95.getDay();
      var day = this.dayOfWeek.find((item) => item.id == weekday)
      console.log("esto devuelve el metodo")
      console.log(day ? day.day.toString().trim() : "")
      return day ? day.day.toString().trim() : "";

    },

    divideInterval() {
      this.countInterval = 0
      this.intervals = []
      this.getDayOfWeekOK()

      let cb = this.calendars_branches.find((c) => c.day == this.getDayOfWeekOK());


      console.log(this.calendars_branches)

      console.log("Este es el día")
      console.log(cb.start_time)
      console.log(this.date)
 


      // Convertir las horas a objetos Date para facilitar los cálculos
      const inicio = new Date(`${this.date}T${cb.start_time}`);
      const fin = new Date(`${this.date}T${cb.closing_time}`);

      console.log("Estas son las fechas")
      console.log(inicio)
      console.log(fin)

      // Array para almacenar los intervals de tiempo
      
      this.timeReservated();
      console.log(this.reservedTime);

      // Bucle para generar intervals de media hora
      let actual = new Date(inicio);
      while (actual < fin) {
        // Obtener la hora y minutos actuales
        const horaActual = actual.getHours();
        const minutosActual = actual.getMinutes();

        // Calcular el próximo intervalo de media hora
        const proximo = new Date(actual);
        proximo.setMinutes(minutosActual + 15);

        // Formatear las horas y minutos en formato HH:MM
        const horaInicioFormato = `${String(horaActual).padStart(2, '0')}:${String(
          minutosActual
        ).padStart(2, '0')}`;

        const horaFinFormato = `${String(proximo.getHours()).padStart(2, '0')}:${String(
          proximo.getMinutes()
        ).padStart(2, '0')}`;
          //optener los horarios reservados
        const isIntervalReserved = this.reservedTime.some((reservation) => {
              const reservationStart = new Date(`${this.date}T${reservation.start_time}`);
              const reservationEnd = new Date(`${this.date}T${reservation.end_time}`);
              return actual >= reservationStart && actual < reservationEnd;
          });
          

          console.log(actual);
        // Almacenar el intervalo en el array
        this.countInterval++
        this.intervals.push({
          time_star: horaInicioFormato,
          time_final: horaFinFormato,
          disable: isIntervalReserved,
          id: this.countInterval
        });

        // Establecer el siguiente intervalo
        actual = proximo;
      }

      console.log(this.intervals);
    },

    totalTimeServices() {
      console.log("Esta es la suma")
      console.log(this.selected_services.length)
      this.totalTime = 0;
      this.selected_services.forEach((index) => {

        
        this.totalTime += this.services[index].duration_service;

        console.log(this.totalTime)
      });
    },

    getServiceDuration(serviceId) {
      // Obtener la duración del servicio por su ID
      const service = this.services.find((s) => s.id === serviceId);
      return service ? service.duration_service : 0;
    },

    chargeBranches() {
      axios
        .get("http://127.0.0.1:8000/api/branch")
        .then((response) => {
          this.branches = response.data.branches;
          //this.chargeServices();
        })
        .catch((err) => {
          console.log(err, "error");
          /* this.displayNotification(
             "error",
             "Error",
             "Error al obtener las sucursales"
           );*/
        });
    },

    chargeCalendarsBranches() {
      axios
        .get(`http://127.0.0.1:8000/api/schedule-show?branch_id=${this.selected_branch.id}`)
        .then((response) => {
          console.log(response.data)
          this.calendars_branches = response.data.Schedules;
          this.dayOfWeek = response.data.Schedules;
          this.chargeServices();
          this.chargeProfessionals();
        })
        .catch((err) => {
          console.log(err, "error");
          /*  this.displayNotification(
              "error",
              "Error",
              "Error al obtener el calendario de la Sucursal"
            );*/
        });
    },


    chargeProfessionals() {
      axios
        .get(`http://127.0.0.1:8000/api/branch_professionals?branch_id=${this.selected_branch.id}`)
        .then((response) => {
          console.log(response.data)
          this.professionals = response.data.professionals;

        })
        .catch((err) => {
          console.log(err, "error");
          /*  this.displayNotification(
              "error",
              "Error",
              "Error al obtener el calendario de la Sucursal"
            );*/
        });
    },

    chargeServices() {
      axios
        .get(`http://127.0.0.1:8000/api/branchservice-show?branch_id=${this.selected_branch.id}`)
        .then((response) => {
          console.log(response.data)
          this.services = response.data.services;
          this.visible_steep1 = true

        })
        .catch((err) => {
          console.log(err, "error");
          this.visible_steep1 = false
          /*  this.displayNotification(
              "error",
              "Error",
              "Error al obtener el calendario de la Sucursal"
            );*/
        });
    },

    timeReservated() {

      let request = {
        professional_id: this.selected_professional,
        branch_id: this.selected_branch.id,
        data: this.date
      
      }
      axios
        .get('http://127.0.0.1:8000/api/professional-reservations-time', {
          params: {
            branch_id: request.branch_id,
            professional_id: request.professional_id,
            data: request.data
          }
        })
        .then((response) => {
          this.reservedTime = response.data.reservations;
          this.disabledIntervals = response.data.reservations;

        })
        .catch((err) => {
          console.log(err, "error");
          /*  this.displayNotification(
              "error",
              "Error",
              "Error al obtener el calendario de la Sucursal"
            );*/
        });
    },



    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },



    updateRange({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T09:00:00`)
      const max = new Date(`${end.date}T17:59:59`)


      for (let i = 0; i < 5; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style>
.no-outline:focus {
  outline: none;
  /* Elimina el contorno al hacer clic */
}
</style>

