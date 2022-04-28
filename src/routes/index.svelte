<script lang="ts" context="module">
  // export const hydrate = false
</script>
<script lang=ts>
  import MainBlock from '$lib/widgets/MainBlock.svelte'
  import ListSidebar from '$lib/widgets/ListSidebar.svelte'
  import MainWithSidebar from '$lib/layout/MainWithSidebar.svelte'
  import securityOfficer from '$lib/assets/security-officer.png'
  import sig from '$lib/assets/minisig.png'

  export let collections = []

  let sidebarItems: [string, string][]
  $: sidebarItems = collections.map(collection =>
    [collection, `/collections/${encodeURIComponent(collection)}`]
  )
</script>

<MainWithSidebar>
  <ListSidebar slot=sidebar title="Collections" items={sidebarItems} icon="cassette" />

  <MainBlock title="Homepage">
    <p>
      <img class="right" src={securityOfficer} alt="Illustration of a bird holding some computer documents" />
      This site contains all the dynamic data used to build auslan.fyi sites. This includes deep,
      frequent scrapes of many websites containing Auslan related information. You’ll also find
      collections of manually labeled data, like subtitle tracks for Asphyxia videos, and data
      for upcoming projects.
    </p>
    <p>
      Feel free to download this data in bulk. Try to use the <code>/raw/</code> URLs when doing
      this as it is easier on the server. In the future, an efficient streaming zipping service
      is planned for bulk downloads. If you plan to directly access this data from a user facing
      app, please get in contact first.
    </p>
    <p>
      Unless otherwise stated in collection readme’s, no assertion is made about the copyright status
      of the data contained here. Much of it is scraped from websites that have varying licensing
      from none at all to some kind of Creative Commons license, to public domain.
    </p>
    <p>
      You are encouraged to form a group of Deaf, Hard of Hearing, and other Auslan users before
      endevouring to build something public facing with this data. It is important to protect our
      beautiful language, and the best way we can do that is by working together with careful planning.
      Do not act without thoughtfulness. Technology can have large impacts on language development.
      Make sure your impact is a good one.
    </p>
    <p>
      <img class=sig src={sig} alt="illustration of Phoenix’s sign name as a very minimalist signature swoop"/>
      Do it right.<br>&nbsp;— Phoenix
    </p>
  </MainBlock>
</MainWithSidebar>

<style>
  img.sig {
    float: right;
    width: 25%;
    margin-top: -1.5em;
    /* shape-outside: circle(); */
  }
  img.right {
    width: 15em;
    float: right;
  }
</style>