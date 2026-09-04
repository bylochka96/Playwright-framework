import { test, expect } from '@playwright/test';
import { Post } from '../../test-data/post-data';

test.describe('JSONPlaceholder API tests', () => {


    test('GET /posts/1', async ({ request }) => {

        const response = await request.get('/posts/1');

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const post: Post = await response.json();

        expect(post).toMatchObject({
            userId: expect.any(Number),
            id: 1,
            title: expect.any(String),
            body: expect.any(String)
        });

    })

    test('POST /posts', async ({ request }) => {
        
    })

    test('PUT /posts/1', async ({ request }) => {
        
    })

    test('PATCH /posts/1', async ({ request }) => {
        
    })

    test('DELETE /posts/1', async ({ request }) => {
        
    })

})