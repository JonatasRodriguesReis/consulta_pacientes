<template>
    <v-app>
        <v-navigation-drawer temporary v-model="drawer" fixed app>
            <v-list>
                <v-list-tile
                        v-for="item in menuItems"
                        :key="item.title"
                        :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="primary" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">
                    Pro-Saúde: Calendários
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat
                       v-for="item in menuItems"
                       :key="item.title"
                       :to="item.link"
                       @click="get_pacientes"
                       >
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
            drawer: false,
            menuItems:[
                { icon:'calendar_today' , title:'Calendário: Médicos', link: '/calendario_medicos',action:''},
                { icon:'event_note' , title:'Calendário: Pacientes', link: '/calendario_pacientes',action:'get_pacientes'},
                { icon:'group_add' , title:'CRUD: Médicos', link: '/Medicos',action:''}
            ]
        }),
        methods:{
            get_pacientes(){
                this.$store.dispatch('getMedicos')
            }
        }
    }
</script>

<style scoped>
</style>