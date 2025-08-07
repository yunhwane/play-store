import { db } from "./database";
import { NewPerson, Person, PersonUpdate } from "./types";

export async function findPersonById(id: number) {
  return await db.selectFrom('person')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function findPeople(criteria: Partial<Person>) {
  let query = db.selectFrom('person')

  if(criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      'last_name',
      criteria.last_name === null ? 'is' : '=',
      criteria.last_name
    )
  }

  if (criteria.gender) {
    query = query.where('gender', '=', criteria.gender)
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return await query.selectAll().execute();
};

export async function updatePerson(id: number, updateWith: PersonUpdate) {
  return await db.updateTable('person')
    .where('id', '=', id)
    .set(updateWith)
    .execute();
};

export async function createPerson(person: NewPerson) {
  return await db.insertInto('person').values(person).returningAll().executeTakeFirst();
};

export async function deletePerson(id: number) {
  return await db.deleteFrom('person').where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
};

