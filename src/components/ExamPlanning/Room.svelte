<script>
  export let room;
  export let exam;
  const reserveRoom = room.reserveRoom;
  const handicapCompensation = room.handicapCompensation;
</script>

<style>
  .R1\.046 {
    background-color: red;
  }
  .R1\.049 {
    background-color: rgb(106, 119, 230);
  }
  .reserveRoom {
    background-color: grey;
  }
  .handicapCompensation {
    background-color: yellow;
  }
</style>

<span class={room.roomID} class:reserveRoom class:handicapCompensation>
   {room.roomID} ({room.studentsInRoom.length}/{room.maxSeats}) - {exam.duration + room.deltaDuration}
  Minuten
</span>
