import Vue from 'vue';

import Modal from '@/components/Modal';
import EventsList from '@/components/EventsList';
import EventCard from '@/components/EventCard';
import GoogleMap from '@/components/GoogleMap/GoogleMap';

const EventBus = new Vue({
    components: {
        Modal,
        EventsList,
        EventCard,
        GoogleMap
    }
});

export default EventBus;
