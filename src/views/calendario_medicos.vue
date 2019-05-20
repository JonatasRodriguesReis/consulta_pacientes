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

            <template>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <v-date-picker
                                v-model="dates"
                                multiple
                        ></v-date-picker>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="dates"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-combobox
                                        v-model="dates"
                                        multiple
                                        clearable
                                        chips
                                        outline
                                        small-chips
                                        label="Dias"
                                        prepend-icon="today"
                                        readonly
                                        v-on="on"
                                ></v-combobox>
                            </template>
                            <v-date-picker v-model="dates" multiple no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(dates)">Salvar</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                    {{dates}}
                </v-layout>
            </template>

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
                                    outline
                                    chips
                                    clearable
                            ></v-select>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs6 sm6 md6>
                            <v-text-field
                                    prepend-icon="looks_6"
                                    v-model="vagas"
                                    :mask="maskVAGAS"
                                    label="Número de Vagas"
                                    placeholder="exemplo: 22"
                                    outline
                                    clearable
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    {{times}}
                    {{vagas}}
                </v-container>
            </template>

            <v-layout align-end justify-end>
                <v-btn @click="saveDatesTimeVacancy" outline flat color="blue">
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
        data: () => ({
            menu: false,
            alert: false,
            maskVAGAS:'##',
            vagas:'',
            dates: [],
            medicos: '',
            medicosOptions: [],
            especialidade: '',
            times: '',
            timesOptions: [
                { text: '06:00'},
                { text: '06:30'},
                { text: '07:00'},
                { text: '07:30'},
                { text: '08:00'},
                { text: '08:30'},
                { text: '09:00'},
                { text: '09:30'},
                { text: '10:00'},
                { text: '10:30'},
                { text: '11:00'},
                { text: '11:30'},
                { text: '12:00'},
                { text: '12:30'},
                { text: '13:00'},
                { text: '13:30'},
                { text: '14:00'},
                { text: '14:30'},
                { text: '15:00'},
                { text: '15:30'},
                { text: '16:00'},
                { text: '16:30'},
                { text: '17:00'}
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
                this.medicosOptions = this.$store.getters.get_MedicosbyEspecialidade(value)
            }
        },

        methods: {
            saveDatesTimeVacancy () {
                var crm = this.$store.getters.get_CRM({especialidade:this.especialidade,medico: this.medicos})
                const medicoInfos = {
                    datas: this.dates,
                    horas: this.times,
                    vagas: this.vagas,
                    idMed: crm,
                    espMed: this.especialidade
                }
                this.$store.dispatch('addDatesTimeVacancy', medicoInfos)

                //this.$store.dispatch
                this.$router.push('/')
            },
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
        }
    }
</script>

<style scoped>
</style>