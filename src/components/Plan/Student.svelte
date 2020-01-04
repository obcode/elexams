<script>
  export let stud;
  const needsRoomAlone =
    stud.studentHandicap !== null &&
    stud.studentHandicap.handicapNeedsRoomAlone;
</script>

<style>
  .needsRoomAlone {
    color: red;
  }
</style>

<span class:needsRoomAlone>
  {stud.studentFamilyname}, {stud.studentFirstname}
  {#if stud.studentHandicap !== null}
    : {stud.studentHandicap.handicapCompensationText}
  {/if}
</span>
