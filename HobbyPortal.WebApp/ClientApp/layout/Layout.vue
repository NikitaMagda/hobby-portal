<template>
    <v-app>
        <app-header></app-header>
            <v-content>
                <slot></slot>
            </v-content>
        <app-footer></app-footer>
    </v-app>
</template>

<script>
import AppHeader from '../layout/Header'
import AppFooter from '../layout/Footer'

export default {
  components: {
      AppHeader,
      AppFooter
  }
}
</script>
