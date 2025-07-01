import nodemailer from "nodemailer";
import fs from "fs";
import csv from "csv-parser";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "codemeadmissions@gmail.com",
    pass: "iako cupp yccl xntx",
  },
});

fs.createReadStream("students.csv")
  .pipe(csv())
  .on("data", (row) => {
    const name = row.Name;
    const email = row.Email;
    const topicsToCover = row["Topics to cover"];
    const technicalViva = row["Technical Viva (15)"];
    const machineTask = row["Machine Task (15)"];
    const communication = row["Communication (10)"];
    const discipline = row["Discipline (5)"];
    const attendance = row["Attendance (5)"];
    const total = row.Total;
    const badge = row.Badge;

    let msgBody = "";

    if (badge === "Beginner") {
      msgBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        
        <p>Dear ${name},</p>
        
        <p>Your weekly evaluation has been completed. Below are your marks and feedback:</p>
        
        <ul style="list-style: none; padding-left: 0;">
          <li><strong>Technical Viva:</strong> ${technicalViva}/15</li>
          <li><strong>Machine Task:</strong> ${machineTask}/15</li>
          <li><strong>Communication:</strong> ${communication}/10</li>
          <li><strong>Discipline:</strong> ${discipline}/5</li>
          <li><strong>Attendance:</strong> ${attendance}/5</li>
        </ul>
        
        <p><strong>✅ Total Score:</strong> ${total}/50</p>
        
        <p><strong>🏅 Badge Earned:</strong> <span style="background-color: #d93f34; color: white; padding: 2px 6px; border-radius: 4px;">${badge}</span></p>
        
        ${
          topicsToCover && topicsToCover.trim() !== ""
            ? `
          <p><strong>Topics to Improve:</strong></p>
          <ul>
            ${topicsToCover
              .split(",")
              .map((topic) => `<li>${topic.trim()}</li>`)
              .join("")}
          </ul>
        `
            : ""
        }
        
        <p style="color: #d93f34; font-weight: bold;">⚠ As your score places you in the <em>Red Zone</em>, you are required to repeat this week.</p>
        
        <p>A <strong>Beginner</strong> badge indicates that the expected performance levels were not met, especially in your technical and practical evaluations. Repeating the week will give you the chance to rebuild your foundation and improve your weak areas.</p>
        
        <p style="font-style: italic;">Please note that repeating the week will involve a fee of ₹500, as per our evaluation policy.</p>
        
        <p>If you need guidance or clarification, do not hesitate to reach out. We believe with effort and dedication, you can significantly improve.</p>
        
        <p>Best regards,<br>
        Jouhar<br>
        Head of EdTech.</p>
        
        </div>
        `;
    } else if (badge === "Active Learner") {
      msgBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        
        <p>Dear ${name},</p>
        
        <p>Your weekly evaluation has been completed. Below are your marks and feedback:</p>
        
        <ul style="list-style: none; padding-left: 0;">
          <li><strong>Technical Viva:</strong> ${technicalViva}/15</li>
          <li><strong>Machine Task:</strong> ${machineTask}/15</li>
          <li><strong>Communication:</strong> ${communication}/10</li>
          <li><strong>Discipline:</strong> ${discipline}/5</li>
          <li><strong>Attendance:</strong> ${attendance}/5</li>
        </ul>
        
        <p><strong>✅ Total Score:</strong> ${total}/50</p>
        
        <p><strong>🏅 Badge Earned:</strong> <span style="background-color: #e3e022; color: white; padding: 2px 6px; border-radius: 4px;">${badge}</span></p>
        
        ${
          topicsToCover && topicsToCover.trim() !== ""
            ? `
          <p><strong>Topics to Improve:</strong></p>
          <ul>
            ${topicsToCover
              .split(",")
              .map((topic) => `<li>${topic.trim()}</li>`)
              .join("")}
          </ul>
        `
            : ""
        }
        
<p style="color: #e3e022; font-weight: bold;">🌟 Great progress — you're building momentum as an <strong>Active Learner</strong>!</p>

<p>Your performance shows steady improvement, though there are still areas to work on to sharpen your technical and practical skills.</p>

<p>Stay consistent, stay curious, and you're well on your way to becoming a <strong>Pro-Performer</strong>!</p>

<p>If you need additional guidance or resources, feel free to reach out — we're here to support your success.</p>

        
        <p>Best regards,<br>
        Jouhar<br>
        Head of EdTech.</p>
        
        </div>
        `;
    } else if (badge === "Pro-Performer") {
      msgBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        
        <p>Dear ${name},</p>
        
        <p>Your weekly evaluation has been completed. Below are your marks and feedback:</p>
        
        <ul style="list-style: none; padding-left: 0;">
          <li><strong>Technical Viva:</strong> ${technicalViva}/15</li>
          <li><strong>Machine Task:</strong> ${machineTask}/15</li>
          <li><strong>Communication:</strong> ${communication}/10</li>
          <li><strong>Discipline:</strong> ${discipline}/5</li>
          <li><strong>Attendance:</strong> ${attendance}/5</li>
        </ul>
        
        <p><strong>✅ Total Score:</strong> ${total}/50</p>
        
        <p><strong>🏅 Badge Earned:</strong> <span style="background-color: #4e7abf; color: white; padding: 2px 6px; border-radius: 4px;">${badge}</span></p>
        
        ${
          topicsToCover && topicsToCover.trim() !== ""
            ? `
          <p><strong>Topics to Improve:</strong></p>
          <ul>
            ${topicsToCover
              .split(",")
              .map((topic) => `<li>${topic.trim()}</li>`)
              .join("")}
          </ul>
        `
            : ""
        }
        
        <p style="color: #4e7abf; font-weight: bold;">🏆 Outstanding achievement — you've earned the <strong>Pro-Performer</strong> badge!</p>

<p>Your consistent efforts, technical understanding, and practical performance have placed you among the top performers this week.</p>

<p>While your progress is commendable, remember — even the best can strive for mastery. Keep refining your skills, stay curious, and set higher benchmarks for yourself.</p>

<p>The entire EdTech team is proud of your dedication and excellence. Keep leading by example!</p>


        
        <p>Best regards,<br>
        Jouhar<br>
        Head of EdTech.</p>
        
        </div>
        `;
    } else {
      msgBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        
        <p>Dear ${name},</p>
        
        <p>Your weekly evaluation has been completed. Below are your marks and feedback:</p>
        
        <ul style="list-style: none; padding-left: 0;">
          <li><strong>Technical Viva:</strong> ${technicalViva}/15</li>
          <li><strong>Machine Task:</strong> ${machineTask}/15</li>
          <li><strong>Communication:</strong> ${communication}/10</li>
          <li><strong>Discipline:</strong> ${discipline}/5</li>
          <li><strong>Attendance:</strong> ${attendance}/5</li>
        </ul>
        
        <p><strong>✅ Total Score:</strong> ${total}/50</p>
        
        <p><strong>🏅 Badge Earned:</strong> <span style="background-color: #57c96e; color: white; padding: 2px 6px; border-radius: 4px;">${badge}</span></p>
        
        ${
          topicsToCover && topicsToCover.trim() !== ""
            ? `
          <p><strong>Topics to Improve:</strong></p>
          <ul>
            ${topicsToCover
              .split(",")
              .map((topic) => `<li>${topic.trim()}</li>`)
              .join("")}
          </ul>
        `
            : ""
        }
        
        <p style="color: #57c96e ; font-weight: bold; font-size: 18px;">👑 Exceptional Work — You've Earned the <strong>Legend</strong> Badge!</p>

<p>Your performance this week has been nothing short of extraordinary.You've showcased mastery in technical understanding, practical execution, communication, and overall discipline.</p>

<p>Achieving <strong>Legend</strong> status reflects not just knowledge, but consistency, hard work, and an unstoppable drive to excel.</p>

<p>Keep this momentum alive — continue to set the bar higher for yourself and inspire your peers.</p>

<p>The entire EdTech team celebrates your success. You're a role model for what's possible when dedication meets talent!</p>



        
        <p>Best regards,<br>
        Jouhar<br>
        Head of EdTech.</p>
        
        </div>
        `;
    }

    const mailOptions = {
      from: "codemeadmissions@gmail.com",
      to: email,

      html: msgBody,
      subject: "Review Perfomance Feedback",
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(`Error sending mail to ${email}`);
        console.log(err);
      } else {
        console.log(`Email send to ${info.response}`);
      }
    });
  })
  .on("end", () => {
    console.log("All Emails procesed");
  });
