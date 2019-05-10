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
                                :locale="pt-br"
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
                            <v-date-picker v-model="dates" multiple :locale="pt-br" no-title scrollable>
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
                <v-container>
                    <v-flex>
                        <v-select
                                v-model="times"
                                prepend-icon="alarm_add"
                                :items="timesOptions"
                                label="Horários"
                                multiple
                                attach
                                outline
                                chips
                                clearable
                                color="success"
                        ></v-select>
                    </v-flex>
                    {{times}}
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
        data: () => ({
            dates: [],
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
            medicos: '',
            medicosOptions: [
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
            ],
            especialidade: '',
            especialidadeOptions: [
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
            ]
        })
    }
</script>

<style scoped>
</style>