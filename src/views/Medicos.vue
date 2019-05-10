<template>
    <div>
        <v-toolbar flat color="white">
            <v-img :src="require('../assets/pro_saude_logo.png')" contain weight="50" height="50"></v-img>
            <template>
                <v-container>
                    <v-flex>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Pesquisa"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-flex>
                </v-container>
            </template>

            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">ADICIONAR</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6>
                                    <v-text-field v-model="editedItem.name" label="Nome do Médico(a)"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field v-model="editedItem.crm" label="Número do CRM"></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-select
                                            :items="['Clínico Geral', 'Nutricionista', 'Psiquiatra', 'Fonoaudiologia', 'Odonotologia', 'Neurologia', 'Cardiologia', 'Dermatologia', 'Pediatria', 'Urologia', 'Oftalmologia']"
                                            label="Especialidade(s)"
                                            multiple
                                            outline
                                            v-model="editedItem.especialidades"
                                            clearable
                                            chips
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field v-model="editedItem.telefone" label="Telefone"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Salvar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.crm }}</td>
                <td class="text-xs-right">{{ props.item.especialidades }}</td>
                <td class="text-xs-right">{{ props.item.email }}</td>
                <td class="text-xs-right">{{ props.item.telefone }}</td>
                <td class="justify-center layout px-0">
                    <v-btn flat icon color="orange">
                        <v-icon @click="editItem(props.item)">
                            edit
                        </v-icon>
                    </v-btn>
                    <v-btn flat icon color="red">
                        <v-icon @click="deleteItem(props.item)">
                            delete
                        </v-icon>
                    </v-btn>
                    <v-btn flat icon color="purple">
                        <router-link to="/Cms" tag="span" style="cursor: pointer">
                            <v-icon>date_range</v-icon>
                        </router-link>
                    </v-btn>
                </td>
            </template>

            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>

            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
            </template>

        </v-data-table>
    </div>
</template>

<script>
    export default {
        data: () => ({
            search: '',
            dialog: false,
            headers: [
                {
                    text: 'Nome',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'CRM', value: 'crm', align: 'right' },
                { text: 'Especialidades', value: 'especialidades', align: 'center' },
                { text: 'E-mail', value: 'email', align: 'center' },
                { text: 'Telefone', value: 'telefone', align: 'center' },
                { text: 'Ações', value: 'name', sortable: false, align: 'center' }
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                crm: '',
                especialidades: '',
                email: '',
                telefone: ''
            },
            defaultItem: {
                name: '',
                crm: '',
                especialidades: '',
                email: '',
                telefone: ''
            }
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Novo' : 'Editar'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.desserts = [
                    {
                        name: 'Jackson kelvin de Souza',
                        crm: 88990,
                        especialidades: [
                            'Nutricionista', 'Dermatologista', 'Clinico Geral'
                        ],
                        email: 'jkdsgg@gmail.com',
                        telefone: 9299984796
                    },
                ]
            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('você tem certeza que quer deletar este médico e todos os seus respectivos dados ?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>

<style scoped>
</style>