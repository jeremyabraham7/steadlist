<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { Categories } from '@/data/categories__topics-rev1'

const props = defineProps({
    idea: Object
})

const emit = defineEmits(['vote'])
const user = useUserStore()

const loading = ref(false)
const category = computed(() => Categories.filter(c => c.value == props.idea.category)[0])
const subcategory = computed(() => category.value?.subcats?.filter(c => c.value == props.idea.subcategory)[0])

const { mutate: addVote, onDone } = useMutation(gql`
  mutation addVote($id: String!, $userId: String!, $type: VoteType!) {
    addVote(data: { ideaId: $id, userId: $userId, type: $type }) {
      id
      upvotes
      downvotes
      lulvotes
      net_votes
      total_votes
      user_vote {
        id
        type
      }
    }
  }
`)
onDone((res) => emit('vote', res?.data?.addVote))


/**
 * Vote mutation logic
 */
const vote = async (type) => {
    loading.value = true
    // Make sure user is setup prior to creating ideas
    await user.setup()

    await addVote({ id: props.idea?.id, userId: user.userId, type })
    loading.value = false
}
</script>
<template>
  <div class="idea-card relative">
    <div class="col-span-1 p-6 pb-12 mb-4 divide-gray-200 rounded-lg bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-lg"
        :class="{
          'transform duration-300 opacity-30 hover:opacity-100' : idea.user_vote?.type == 'DOWN'
        }">
      <p v-if="category || subcategory" class="text-xs text-gray-800 dark:text-slate-400 mb-1">
        {{ category?.label }} <span v-if="category && subcategory">/</span> {{ subcategory?.label }}
      </p>
      <p :title="idea?.userInput">
        {{ idea.text }}
      </p>


      <div class="absolute bottom-[-10px] right-0 text-center">
        <a @click.prevent="vote('DOWN')" class="vote-btn inline-block ml-2" :class="{ 
          'voted--active' : idea.user_vote?.type == 'DOWN',
          'voted--inactive' : idea.user_vote?.type && idea.user_vote?.type !== 'DOWN'
        }" href="#" :disabled="loading || idea.user_vote?.type == 'DOWN'">
          <span class="vote-count">{{ idea.downvotes || 0 }}</span>
          <span class="emoji-icon">💩</span>
        </a>
        <!-- <span class="px-5 dark:text-slate-300 font-medium">
          {{ (idea.upvotes - idea.downvotes) || 0 }}
        </span> -->
        <a @click.prevent="vote('UP')" class="vote-btn inline-block ml-2" :class="{ 
          'voted--active' : idea.user_vote?.type == 'UP',
          'voted--inactive' : idea.user_vote?.type && idea.user_vote?.type !== 'UP'
        }" href="#" :disabled="loading || idea.user_vote?.type == 'UP'">
          <span class="vote-count">{{ idea.upvotes || 0 }}</span>
          <span class="emoji-icon">❤️</span>
        </a>
        
        <a @click.prevent="vote('LUL')" class="vote-btn inline-block ml-2" :class="{ 
          'voted--active' : idea.user_vote?.type == 'LUL',
          'voted--inactive' : idea.user_vote?.type && idea.user_vote?.type !== 'LUL'
        }" href="#" :disabled="loading || idea.user_vote?.type == 'LUL'">
          <span class="vote-count">{{ idea.lulvotes || 0 }}</span>
          <span class="emoji-icon">🤣</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.vote-btn {
  @apply px-2 rounded-full dark:bg-slate-600;
}

.vote-btn .vote-count {
  margin-right: 7px;
}
.vote-btn .emoji-icon {
  transition: all 0.2s ease;
  display: inline-block;
}

.vote-btn .emoji-icon:hover {
  transform: scale(1.3);
}

.vote-btn .emoji-icon:active {
  transform: scale(0.9);
}

a.voted--active {
  @apply dark:bg-indigo-600;
  filter: grayscale(0);
}

a.voted--inactive {
  @apply text-gray-400 bg-gray-600 !important;
  filter: grayscale(1);
}
</style>