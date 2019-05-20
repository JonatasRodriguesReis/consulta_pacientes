<template>
    <v-container>
        <v-layout row wrap>

            <template>
                <v-container fluid grid-list-xl>
                    <v-layout align-center wrap>

                        <v-flex xs12 sm6>
                            <v-select
                                    prepend-icon="school"
                                    v-model="especialidade"
                                    :items="especialidadeOptions"
                                    label="Especialidade"
                                    outline
                                    chips
                                    clearable
                            ></v-select>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm6>
                            <v-select
                                    prepend-icon="account_circle"
                                    v-model="medicos"
                                    :items="medicosOptions"
                                    label="Médico"
                                    outline
                                    chips
                                    clearable
                            ></v-select>
                        </v-flex>
                        {{especialidade}}
                        {{medicos}}
                    </v-layout>
                </v-container>
            </template>

<<<<<<< HEAD
             <!--<template>
=======
            <template>
>>>>>>> b0c16445b0a57649d89d4a3fe01acd93e272415e
                <v-layout row wrap>
                    <v-container>
                        <div>
                            <v-date-picker
                                    v-model="date"
                                    :locale="pt-br"
                                    :allowed-dates="allowedDates"
                                    class="mt-3"
                                    min="2019-05-01"
                                    max="2050-12-31"
                            ></v-date-picker>
                        </div>
                    </v-container>
                </v-layout>
                {{date}}
<<<<<<< HEAD
            </template>-->
=======
            </template>
>>>>>>> b0c16445b0a57649d89d4a3fe01acd93e272415e

            <template>
                <v-container fluid grid-list-xl>
                    <v-layout align-center wrap>

                        <v-flex xs12 sm6>
                                <v-select
                                        v-model="times"
                                        prepend-icon="alarm_add"
                                        :items="timesOptions"
                                        label="Horários"
                                        attach
                                        chips
                                        outline
                                        clearable
                                        color="success"
                                ></v-select>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    v-model="pacientes"
                                    :items="pacientesOptions"
                                    label="Pacientes"
                                    outline
                                    chips
                                    clearable
                            ></v-autocomplete>
                        </v-flex>
                        {{times}}
                    </v-layout>
                </v-container>
            </template>

            <v-layout align-end justify-end>
                <v-btn v-if="!alert" @click="alert = true" outline flat color="blue">
                    <v-icon left="">save</v-icon>
                    SALVAR
                </v-btn>
            </v-layout>

            <template>
                <div>
                    <v-alert
                            v-model="alert"
                            dismissible
                            outline
                            type="success"
                    >
                        Os Dados Foram Salvos Com Sucesso.
                    </v-alert>
                </div>
            </template>

        </v-layout>
    </v-container>
</template>

<script>
    export default {
        beforeRouteEnter (to, from, next) {
            //this.$store.dispatch('getMedicos')
            next();
        },
        data: () => ({
            date: '',
            datas: [],
            alert: false,
            menu: false,
            times: '',
            timesOptions: [
                { text: '06:00'},
                { text: '06:15'},
                { text: '06:30'},
                { text: '06:45'},
                { text: '07:00'},
                { text: '07:15'},
                { text: '07:30'},
                { text: '07:45'},
                { text: '08:00'},
                { text: '08:15'},
                { text: '08:30'},
                { text: '08:45'},
                { text: '09:00'},
                { text: '09:15'},
                { text: '09:30'},
                { text: '09:45'},
                { text: '10:00'},
                { text: '10:15'},
                { text: '10:30'},
                { text: '10:45'},
                { text: '11:00'},
                { text: '11:15'},
                { text: '11:30'},
                { text: '11:45'},
                { text: '12:00'},
                { text: '12:15'},
                { text: '12:30'},
                { text: '12:45'},
                { text: '13:00'},
                { text: '13:15'},
                { text: '13:30'},
                { text: '13:45'},
                { text: '14:00'},
                { text: '14:15'},
                { text: '14:30'},
                { text: '14:45'},
                { text: '15:00'},
                { text: '15:15'},
                { text: '15:30'},
                { text: '15:45'},
                { text: '16:00'},
                { text: '16:15'},
                { text: '16:30'},
                { text: '16:45'},
                { text: '17:00'}
            ],
            datas: [ "2019-05-13", "2019-05-14", "2019-05-15", "2019-05-16", "2019-05-17", "2019-05-18" ],
            medicos: '',
            medicosOptions: [
                /*{ text: 'Ana Tereza de A. Vasques'},
                { text: 'Brisa Silva Bracchi'},
                { text: 'Debora Kaynara Patricio da Silva'},
                { text: 'Glaucia Adriana Dantas Pereira'},
                { text: 'Cleiton Alves Feitosa'},
                { text: 'Diogo Fernandes de Souza'},
                { text: 'Guilherme Azevedo Reis'},
                { text: 'Ramon Douglas Neves de Andrade'},
                { text: 'Lorena Alcântara de Farias'},
                { text: 'Monique Gurgel Aguiar'},
                { text: 'Anne Marie Alves Trindade'}*/
            ],
            especialidade: '',
            /*especialidadeOptions: [
                { text: 'Clínico Geral'},
                { text: 'Nutricionista'},
                { text: 'Psiquiatra'},
                { text: 'Fonoaudiologia'},
                { text: 'Odonotologia'},
                { text: 'Neurologia'},
                { text: 'Cardiologia'},
                { text: 'Dermatologia'},
                { text: 'Pediatria'},
                { text: 'Urologia'},
                { text: 'Oftalmologia'}
            ],*/
            pacientes: '',
            pacientesOptions: [
                { text: 'Ana Tereza de A. Vasques'},
                { text: 'Brisa Silva Bracchi'},
                { text: 'Debora Kaynara Patricio da Silva'},
                { text: 'Glaucia Adriana Dantas Pereira'},
                { text: 'Cleiton Alves Feitosa'},
                { text: 'Diogo Fernandes de Souza'},
                { text: 'Guilherme Azevedo Reis'},
                { text: 'Ramon Douglas Neves de Andrade'},
                { text: 'Lorena Alcântara de Farias'},
                { text: 'Monique Gurgel Aguiar'},
                { text: 'Anne Marie Alves Trindade'}
            ]
        }),

        computed:{
            especialidadeOptions(){
                return this.$store.getters.get_especialidades
            }
        },

        watch: {
            search (val) {
                val && val !== this.select && this.querySelections(val)
            },
            especialidade: function(value){
<<<<<<< HEAD
                this.medicosOptions = this.$store.getters.get_MedicosbyEspecialidade(value)
                return value
            },
            medicos: function(value){
                //this.medicosOptions = this.$store.getters.get_MedicosbyEspecialidade(value)
                this.$store.getters.get_Datas({especialidade: this.especialidade,medico: value})
            }
=======
               this.medicosOptions = this.$store.getters.get_MedicosbyEspecialidade(value)
               return value
            },
            medicos: function(value){
                this.datas = this.$store.getters.get_Datas({especialidade: this.especialidade,medico:value})
            },

            
>>>>>>> b0c16445b0a57649d89d4a3fe01acd93e272415e
        },

        methods: {
            querySelections (v) {
                this.loading = true
                // Simulated ajax query
                setTimeout(() => {
                    this.items = this.states.filter(e => {
                        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                    })
                    this.loading = false
                }, 500)
            },

<<<<<<< HEAD
            allowedDates (val) {
                if(this.datas.indexOf(val) != -1){
                    return true
                }
                return false
=======
            allowedDates (val){
               if(this.datas.indexOf(val) != -1){
                   return true
               }
               return false
>>>>>>> b0c16445b0a57649d89d4a3fe01acd93e272415e
            }
        }
    }
</script>

<style scoped>
</style>