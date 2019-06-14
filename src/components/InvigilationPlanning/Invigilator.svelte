<script>
  export let invigilatorID;
  export let dayIndex;
  import { invigilations } from "../../stores/invigilation.js";
  let invigilator;
  let want;
  let can;
  let notAvailable;

  invigilations.subscribe(is => {
    invigilator = is[1].find(i => i.invigilatorID == invigilatorID);
    want =
      invigilator !== null &&
      invigilator !== undefined &&
      invigilator.invigilatorWantDays.includes(dayIndex);
    can =
      invigilator !== null &&
      invigilator !== undefined &&
      invigilator.invigilatorCanDays.includes(dayIndex);
    notAvailable =
      (!want && !can) ||
      invigilator.invigilatorMinutesTodo -
        invigilator.invigilatorsMinutesPlanned <
        0;
  });
</script>

<style>
  td {
    padding: 4px;
  }
  .invigilator {
    font-size: 12px;
  }
  .want {
    background-color: green;
  }
  .can {
    background-color: yellow;
  }
  .notAvailable {
    background-color: grey;
    color: darkgrey;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
</style>

<tr class="invigilator" class:want class:can class:notAvailable>
  <td> {invigilator.invigilatorName} </td>
  <td class="right">
     {invigilator.invigilatorMinutesTodo - invigilator.invigilatorsMinutesPlanned}

  </td>
  <td class="center"> {invigilator.invigilatorInvigilationDays} </td>
</tr>
