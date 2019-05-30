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
</script>

<h1>NTA</h1>

{#if examsWithNTA === undefined}
  Loading...
{:else}
  <ul>
    {#each examsWithNTA as exams}
      <li>
         {exams[0].lecturer.personFullName}
        <a href={mailtoLink(exams[0].lecturer, exams)}>E-Mail</a>

        <ul>
          {#each exams as exam}
            <li>
               {exam.name}
              <ul>
                {#each exam.handicapStudents as stud}
                  <li>
                     {stud.studentHandicap.handicapStudentname}: {stud.studentHandicap.handicapCompensationText}

                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
{/if}
