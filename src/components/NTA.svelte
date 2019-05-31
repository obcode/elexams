<script>
  import { semesterConfig } from "../stores/main.js";
  let examsWithNTA;
  async function fetchExamsWithNTA() {
    let resp = await fetch("http://localhost:8080/examsWithNTA");
    examsWithNTA = await resp.json();
  }
  fetchExamsWithNTA();

  function mailtoLink(lecturer, exams) {
    let link =
      "mailto:" +
      lecturer.personEmail +
      "?subject=[Prüfungsplanung " +
      $semesterConfig.semester +
      "] Nachteilsausgleich bei Ihren Prüfungen" +
      "&body=[Diese E-Mail ist automatisch generiert]\n\nSehr geehrteR Frau/Herr " +
      lecturer.personFullName +
      ",\n\nfür Ihre Prüfungen sind mir folgende Studierende mit Nachteilsausgleich bekannt:\n\n";

    for (const exam of exams) {
      link += "- " + exam.name + " (" + exam.anCode + ")\n\n";
      for (const student of exam.handicapStudents) {
        const stud = student.studentHandicap;
        link +=
          "  - " +
          stud.handicapStudentname +
          ": " +
          stud.handicapCompensationText +
          "\n\n";
      }
    }
    link +=
      "Sollten Ihnen weitere Studierende mit Nachteilsausgleich bekannt sein oder bekannt werden,\n" +
      "geben Sie mir bitte sofort Bescheid, damit ich sie in der Planung berücksichtigen kann.\n\n" +
      "Mit freundlichen Grüßen\nOliver Braun";
    return encodeURI(link);
  }

  function calcRowspanExam(exams) {
    let rowspan = 0
    for (const exam of exams) {
      rowspan += exam.handicapStudents.length
    }
    return rowspan
  }

  function flattenArray(allExams) {
    let array = []
    for (const exams of allExams) {
      let lecturerSet = false
      let arrayForLecturer = []
      for (const exam of exams) {
        let examSet = false
        for (const stud of exam.handicapStudents) {
          if (!lecturerSet) {
            lecturerSet = true
            examSet = true
            // first entry
            arrayForLecturer.push([exams,exam, stud])
          } else {
            if (!examSet) {
              examSet = true
              // not the first exam of lecturer
              arrayForLecturer.push([null, exam, stud])
            } else {
              arrayForLecturer.push([null, null, stud])
            }
          }
        }
      }
      array.push(arrayForLecturer)
    }
    return array
  }

</script>

<style>
.center {
  margin: auto;
  width: 90%;
  padding: 10px;
}
  table, tr, td {
    padding: 10px;
    border: 1px solid black;
    border-collapse: collapse;
    user-select: none;
    vertical-align: top;
    font-size: 12px;
  }

</style>


{#if examsWithNTA === undefined}
<h1>
  Loading...
</h1>
{:else}
<div class="center">
<h1>Prüfungen mit Studierenden mit Nachteilsausgleich</h1>
  <table>
    {#each flattenArray(examsWithNTA) as lecturerArray}
    {#each lecturerArray as entry}
      <tr>
        {#if entry[0] !== null }
        <td rowspan={calcRowspanExam(entry[0])}>
          <a href={mailtoLink(entry[0][0].lecturer, entry[0])}>E-Mail</a>
           {entry[0][0].lecturer.personFullName}
        </td>
        {/if}
        {#if entry[1] !== null}
          <td rowspan={entry[1].handicapStudents.length}>
          {entry[1].name}
          </td>
        {/if}
        <td>
        {entry[2].studentHandicap.handicapStudentname}
        </td>
        <td>
        {entry[2].studentHandicap.handicapCompensationText}
        </td>
      </tr>
    {/each}
    {/each}
  </table>
</div>
{/if}
