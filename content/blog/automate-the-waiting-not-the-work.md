---
title: "Automate the waiting, not the work"
slug: automate-the-waiting-not-the-work
date: 2026-09-17
category: Operations
excerpt: "Teams automate the step someone complains about. The hours are almost always sitting in the gaps between steps, and that is where I start."
image: /blog/automate-the-waiting-not-the-work.jpg
---

Almost every automation conversation I have opens at the same place: the step someone hates doing. Copying rows into a sheet. Retyping the same invoice. Chasing a status in Slack for the third time that day.

That step is real. It is also, most of the time, not the constraint. It is simply the part somebody can feel, because they are the one doing it.

When I actually sit with a process and write down when things happened, the hours are rarely in the doing. They are in the gaps between the doing. The request that waited for a reply. The invoice that waited for one approval from one person who was in meetings. The ticket that arrived on Friday evening and got picked up on Monday morning.

So the order I work in is this. Find the waiting, automate that, and leave the typing until later. Often the typing turns out not to need automating at all.

## The step people complain about is rarely the constraint

Pain and cost are different things, and only one of them is loud.

Before you scope anything, do the arithmetic in the open: minutes per run times runs per week for the manual step, against the time a single request spends sitting still between arriving and being finished. Put both numbers on the same page. In ops teams I have worked in, the second number wins by an embarrassing margin, and nobody had written it down before.

This is why so many pilots feel disappointing after launch. The tool works. The demo was fine. The team still says everything takes about as long as it used to, because the queue that owned the calendar was never touched.

## Write the process down with times, not just steps

Most process maps are drawn in a workshop, from memory, by the people who understand the process best. They are neat, they are agreed, and they describe a version of the work that does not happen.

Do it the boring way instead. Take twenty real cases from last week and give each one three columns: when it arrived, when a human first touched it, when it left. Nothing else. No swimlanes, no tooling decisions, no opinions.

Two things fall out of that sheet almost immediately.

- **The unowned wait.** A step called "review" or "approval" with no name next to it, where the clock runs and nobody thinks of it as their turn.
- **The batch.** Work that only moves when someone sits down to clear a pile, which means the average item waits for half a pile.

You do not need a tool to see either one. You need the timestamps, which is the part everyone skips because it is dull and it takes a week.

## Automate the handoff before you automate the task

Once you can see where the clock runs, the first moves are usually not clever, and usually not AI.

Route the request to a named owner the moment it arrives rather than into a shared inbox. Notify at the point something becomes ready, not on a daily digest. Delete the approval nobody has rejected in a year, or default it below a threshold and review the exceptions. Make the handoff explicit, so no item is ever in a state where two people each think it is with the other.

I have seen a routing rule and one deleted approval step do more for cycle time than any model would have. That is not a story about AI being overrated. It is about earning the right to automate the interesting part.

## Give the model the judgement, and keep the decision

AI earns its place at a specific point: turning messy human input into something structured, and preparing a decision so the human can make it in seconds rather than minutes.

A supplier email becomes a structured request with the amount, the date and the missing field flagged. A long thread becomes three lines and a recommendation. A reply gets drafted so approval is a yes or a no, not a writing exercise at nine in the evening.

Notice what stays with the person. The decision does. The judgement about whether this is worth doing, whether this client is a risk, whether this exception should become a rule. That is not squeamishness about AI, it is where the value sits: automation amplifies whatever thinking is already there. If your approval policy lives in one person's head and is applied differently on a bad day, a model will apply that inconsistency faster and with more confidence.

Write the policy down first. Then the model has something to follow, and so does the new hire.

## Ship the ugly version, then improve it

The first version should handle one path, for one owner, with a failure route that tells a human when it did not work. Build that failure route before the happy path. It is the difference between a system people trust and a system people quietly check by hand, which is the same as not having it.

Then measure the thing you set out to change. Not runs, not tokens, not hours theoretically saved. Cycle time from arrival to done, on the same three columns you started with.

If that number has not moved, you automated the wrong step. Say so early, change it, and keep the sheet.

## Where to start this week

Pick one process that people complain about. Take last week's real cases, three columns, arrival to first touch to done. Find the largest gap, and ask who owns it.

That exercise takes an afternoon and it will tell you more than any tool evaluation. It also tends to tell you the automation you were about to buy was aimed at the wrong minute.

If you want a second pair of eyes on the sheet, that is most of what happens in a [clarity session](/booking), and how every build I do through Soch starts. The [consulting page](/services/consulting) explains the rest, and there is a [guide on building the failure path first](/guides/n8n-build-the-failure-path-first) if you would rather start on your own.
