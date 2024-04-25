<template>
  <v-row class="mt-6 ma-2">
    <v-col cols="12" md="3" xs="12" >
     <!-- parte izquierda menu para escoger la sucursal -->
     
  <v-snackbar class="mt-12" location="right top" :timeout="sb_timeout" :color="sb_type" elevation="24"
    :multi-line="true" vertical v-model="snackbar">
    <v-row>
      <v-col md="2">
        <v-avatar :icon="sb_icon" color="sb_type" size="40"></v-avatar>
      </v-col>
      <v-col md="10">
        <h4>{{ sb_title }}</h4>
        {{ sb_message }}

      </v-col>
    </v-row>
  </v-snackbar>
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

    <v-col cols="12" md="9" xs="12">
      <v-card elevation="4">
        <v-toolbar color="orange lighten-2">
          <span class="text-subtitle-1"> <strong>Formulario de Reservas</strong></span>

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
              Información de Cliente
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5" :complete="e1 > 5" color="orange lighten-2">
              Datos Personales
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
          <!-- SERVICIOS -->
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
                <v-btn color="orange lighten-2" @click="handleButtonClick " :disabled="!selected_services.length>0">
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
                        <v-list-item-group v-model="selected_professional" return-object active-class="warning--text"  @change="updateDates">
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

                <v-btn class="mr-2" color="orange lighten-2" @click="volverServices()">
                  Volver
                </v-btn>

                <v-btn color="orange lighten-2" @click="e1 = 3" :disabled="selected_professional === 0 || !selected_professional">
                  Continuar
                </v-btn>
              </div>

            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row>

                <v-col cols="12" sm="4" class="mt-2">
                  <v-card class="mx-auto mt-2 ml-2 mr-2">
                    
                    <v-date-picker ref="picker" :events="arrayEvents" event-color="green lighten-1"
                      @change="divideInterval()" v-model="date" color="orange lighten-2" elevation="6" locale="es-Es" :allowed-dates="allowedDates" 
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

              <v-btn color="orange lighten-2" class="mr-2" @click="volverProfessionals()">
                Volver
              </v-btn>



              <v-btn color="orange lighten-2" @click="e1 = 4" :disabled="selected_interval !== 0 && !selected_interval">
  Continuar
</v-btn>


            </v-stepper-content>
            <v-stepper-content step="4">
                <v-row>
                  <v-col cols="12">
                    <v-card class="mx-auto mt-2 ml-2 mr-2">

                      <v-list two-line>
  <v-list-item-group v-model="selectedTypeClient" return-object active-class="warning--text">
    <!-- Primer template estático -->
    <v-list-item @click="showDialog">
      <template v-slot:default="{  }">
        <v-list-item-avatar>
          <v-img src="url_de_tu_imagen_estatica" alt="Avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> <strong>Soy Cliente</strong> </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <!-- Contenido estático de acción 1 -->
        </v-list-item-action>
      </template>
    </v-list-item>

    <!-- Segundo template estático -->
    <v-list-item>
      <template v-slot:default="{  }">
        <v-list-item-avatar>
          <v-img src="url_de_tu_imagen_estatica" alt="Avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> <strong>Es mi primera vez</strong> </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <!-- Contenido estático de acción 2 -->
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list-item-group>
</v-list>

                    </v-card>

                    <v-divider class="pt-4 mb-4"></v-divider>
                  </v-col>

                </v-row>

                <v-btn class="mr-2" color="orange lighten-2" @click="e1 = 3">
                  Volver
                </v-btn>

                <v-btn color="orange lighten-2" @click="getSelectedTypeClient" :disabled="!selectedTypeClient">
                  Continuar
                </v-btn>
             

            

      
                

            

         
              <v-divider class="pt-4 mt-4"></v-divider>

              



              <v-dialog v-model="dialogVisible"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="orange lighten-2"
              dark
            >Datos de cliente</v-toolbar>
            <v-card-text>
              <v-col cols="12" md="12" class="mt-2">
                    <v-text-field v-model="email_client" label="Correo Electrónico o Teléfono" outlined
                      required></v-text-field>
                    </v-col>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn          
              
              @click="dialog.value = false;email_client = '';selectedTypeClient = 1"
              >Cancelar</v-btn>
              <v-btn
              color="orange lighten-2"
              
              
                @click="getCliente()"
              >Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

            </v-stepper-content>


            <v-stepper-content step="5">
     

      
                  <v-form ref="form" lazy-validation>
                    <v-row>
                    <v-col cols="12" md="4" class="mt-2">
                    <v-text-field :disabled="verificate" v-model="name_client" :counter="50" :rules="nameRules" label="Nombre" outlined
                      required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" class="mt-2">
                    <v-text-field :disabled="verificate" v-model="surname_client" :counter="50" :rules="surname_client_Rules" label="Apellido Paterno" outlined
                      required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4" class="mt-2">
                    <v-text-field :disabled="verificate" v-model="second_surname" :counter="50" :rules="second_surname_Rules" label="Apellido Materno" outlined
                      required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-2">
                    <v-text-field :disabled="verificate" v-model="phone_client" :rules="phoneRules" label="Teléfono" outlined required></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="mt-2">
                    <v-text-field :disabled="verificate" v-model="email_client" :rules="emailRules" label="Correo Electrónico" outlined
                      required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" >
                    
                      
                      <!-- AQUI CHECKBOX DE TERMINOS Y CONDICIONES -->
                      <v-container>
    <v-row align="center">
      <v-checkbox v-model="checkbox" color="orange lighten-2"></v-checkbox>
      <span @click="handleClick" style="cursor: pointer;">Aceptar términos y condiciones</span>
    </v-row>
  </v-container>

                    </v-col>
                    </v-row>

                  </v-form>

            

         
              <v-divider class="pt-4 mt-4"></v-divider>

              <v-btn color="orange lighten-2" class="mr-2" @click="e1 = 4;selectedTypeClient = 1;verificate = false;checkbox = false;clearText()">
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
            :disabled="hasErrors()"
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
              :loading="loading"
              
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
    snackbar: false,
    sb_type: '',
    sb_message: '',
    sb_timeout: 2000,
    sb_title: '',
    sb_icon: '',
    loading : false,
    selectedTypeClient:'',
    verificate : false,
    // Agrega la lógica proporcionada
  disabledIntervals: [],
message:"Los datos para realizar la reserva están completos. Se enviará correo electrónico con los datos de la reserva",
    checkbox:false,
    name_client:"",
    email_client:"",
    phone_client:"",
    startDate: "",
    endDate: "",
    vacations: '',
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
    date: null,
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

    dialogVisible: false,
      messageDialog: "Mensaje del diálogo",


    professionals: [
       { id: 1, name: ' ', color: '' }
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
    reservedTime: [],


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
    
    //console.log(this.allowedDates);
    
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
    volverServices(){
      this.e1 = 1;
      this.selected_professional = "";
    },
    volverProfessionals(){
      this.e1 = 2;
      this.selected_interval = "";
      this.intervals = [];
      //this.selected_professional = [];
    },
    showAlert(sb_type,sb_message, sb_timeout)
  {    
   this.sb_type= sb_type
  
   if(sb_type=="success")
   {
     this.sb_title='Éxito'
     this.sb_icon='mdi-check-circle'
   }
   
   if(sb_type=="error")
   {
     this.sb_title='Error'
     this.sb_icon='mdi-check-circle'
   }
  
   if(sb_type=="warning")
   {
     this.sb_title='Advertencia'
     this.sb_icon='mdi-alert-circle'
   }
   this.sb_message= sb_message
   this.sb_timeout= sb_timeout
   this.snackbar= true
  },
    allowedDates(val) {
      return !this.disabledDates().includes(val);
      //return val !== disabledDate;
  },

    disabledDates() {
      
  const disabledRange = [];
  if(this.vacations.length > 0){
    this.vacations.forEach(vacation => {
    let currentDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().substr(0, 10);
      disabledRange.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  }
      
  /*let currentDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  const disabledRange = [];

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().substr(0, 10); // Obtener la fecha en formato YYYY-MM-DD
    disabledRange.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }*/
  console.log("disabledRange:", disabledRange);
  
  return disabledRange;
},
    updateDates(selectedItem) {
       // Busca el profesional seleccionado en el array professionals por su id
       const selectedProfessional = this.professionals.find(professional => professional.id === selectedItem);
        
        // Verifica si se ha seleccionado un profesional
        if (selectedProfessional) {
            // Asigna los valores de startDate y endDate
            this.vacations = selectedProfessional.vacations;
            //this.startDate = selectedProfessional.startDate;
            //this.endDate = selectedProfessional.endDate;
        } else {
            // Si no se seleccionó ningún profesional, establece las fechas en null o lo que sea apropiado para tu caso
            this.vacations = '';
            //this.startDate = null;
            //this.endDate = null;
        }
        console.log('this.vacations');
      console.log(this.vacations);
    },
    hasErrors() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(
      this.name_client === '' ||
         this.phone_client === '' ||
         this.surname_client === '' ||
         this.second_surname === '' ||
         this.email_client === '' ||
         !emailRegex.test(this.email_client) ||
         !this.checkbox
     ){
return true;
     }
     else{
      return false;
     }
    },
    getSelectedTypeClient()
    {
      console.log('this.selectedTypeClient');
      console.log(this.selectedTypeClient);
      this.e1 = 5;
    },
clearText()
{
  this.name_client = '';
         this.phone_client = '';
         this.surname_client = '';
         this.second_surname = '';
         this.email_client = '';

},
    getCliente()
    {
      console.log('AQUI LLAMAR EL METODO PARA SABER SI ES CLIENTE');
    
      console.log('-------------------------------sendData()----------------------------------------');
      console.log(this.email_client);
      

      // Realiza la solicitud POST Y BUSCO LOS DATOS DEL CLIENTE 
      axios.get(`http://127.0.0.1:8000/api/client-email-phone?email=${this.email_client}`)
        .then(response => {
          // Maneja la respuesta de la solicitud aquí
        this.clientRegister = response.data.client;

        
        console.log('-------------------------------clientRegister----------------------------------------');
        console.log('this.clientRegister.length');
        console.log(this.clientRegister.length);
        if(this.clientRegister.length > 0)
        {
          const client = this.clientRegister[0];
        console.log(this.clientRegister[0]);
        //ASIGNO A LOS CAMPOS DEL FORMULARIO TDS LOS DATOS
         this.name_client = client.name;
         this.phone_client = client.phone;
         this.surname_client = client.surname;
         this.second_surname = client.second_surname;
         this.email_client = client.email;
         this.e1 = 5;
         this.dialogVisible = false;
         this.verificate = true;
        }
        else
        {
         this.dialogVisible = false;
         this.email_client = '';
         setTimeout(() => {
          this.dialogVisible = true;
      }, 300);
          this.e1 = 4;
          this.verificate = false;
        }        
       
              })
        .catch(error => {
          // Maneja cualquier error que pueda ocurrir durante la solicitud
          console.error('Error al hacer la solicitud:', error);
        });

    

    },
    showDialog() {
      this.dialogVisible = true;
    },
    // handleButtonClick() {
    //   // Aquí se imprime en la consola el valor de selected_interval
    //   console.log('Valor de selected_interval:', this.selected_interval);
      
    //   // Lógica adicional para manejar el clic del botón
    // },
    handleClick() {
      // Lógica a ejecutar cuando se hace clic en el texto
      //alert('Has aceptado los términos y condiciones');
      // window.location.href = 'https://politica-de-privacidad.simplifies.cl/';
      window.open('https://politica-de-privacidad.simplifies.cl/', '_blank');
    },
    isIntervalDisabled(time) {
    // Aquí puedes agregar la lógica para desactivar ciertos horarios.
    // Por ejemplo, si deseas desactivar los horarios '10:00' y '11:00':
    return this.disabledIntervals.includes(time);
  },
    send()
    {
      this.loading = true;
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
       // this.message=response.data.msg
       this.loading = false;
       const t =response.data.msg
       console.log(t);
              }).finally(() => {
                this.showAlert("success","Reserva realizada correctamente", 3000); 
                setTimeout(() => {
        // Redirige a la URL externa deseada
        window.location.href = 'https://landingbh.simplifies.cl/';
      }, 3000); 
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
      this.countInterval = 0;
      this.intervals = [];
      this.getDayOfWeekOK();


      let cb = this.calendars_branches.find((c) => c.day == this.getDayOfWeekOK());
      console.log('this.calendars_branches')
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
      this.services = [];
      this.e1 = 1;
      this.selected_services = [];
      this.chargeServices();      
      axios
        .get(`http://127.0.0.1:8000/api/schedule-show?branch_id=${this.selected_branch.id}`)
        .then((response) => {
          console.log(response.data)
          this.calendars_branches = response.data.Schedules;
          this.dayOfWeek = response.data.Schedules;
          this.chargeServices();
         // this.chargeProfessionals();
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
    handleButtonClick() {
      // Llama a ambos métodos dentro de la función de manejo de eventos
    
      this.chargeProfessionals();
      this.e1 = 2;
    },


    chargeProfessionals() {
     
      console.log('this.selected_services');
 

        const newArrayService = this.selected_services.map(item => parseInt(item)); // Convertir a enteros si es necesario
        console.log(newArrayService);
              const data = {
        
                services: this.selected_services,
                branch_id: this.selected_branch.id
            };
            axios
        .get(`http://127.0.0.1:8000/api/branch-professionals-barber`, {
            params: data
        })
        .then((response) => {
          this.professionals = response.data.professionals;
        }).finally(() => {
          if (this.professionals.length <= 0 ) {
            console.log('entra aqui');
            this.showAlert("warning","No hay profesional que realice todos los servicios seleccionados", 3000);
            this.e1 = 1;
          }
          });
    },

    
    chargeServices() {
      
      this.selected_professional = "";
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
      this.reservedTime = [];
          this.disabledIntervals = [];

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

