# Supabase RLS Setup for Companion Deletion

## Problem

You cannot delete companions from Supabase because the Row Level Security (RLS) policies are likely not configured to allow deletion operations.

## Solution

### 1. Enable RLS on the companions table

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable RLS on companions table
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
```

### 2. Create RLS policies for companions table

Run these SQL commands to set up proper policies:

```sql
-- Policy to allow users to read all companions (for browsing)
CREATE POLICY "Users can view all companions" ON companions
FOR SELECT USING (true);

-- Policy to allow users to create companions
CREATE POLICY "Users can create companions" ON companions
FOR INSERT WITH CHECK (auth.uid() = author);

-- Policy to allow users to update their own companions
CREATE POLICY "Users can update their own companions" ON companions
FOR UPDATE USING (auth.uid() = author);

-- Policy to allow users to delete their own companions
CREATE POLICY "Users can delete their own companions" ON companions
FOR DELETE USING (auth.uid() = author);
```

### 3. Verify the policies

Check if the policies are working:

```sql
-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'companions';
```

### 4. Test the deletion

You can test the deletion directly in Supabase:

```sql
-- Test deletion (replace with actual companion ID and user ID)
DELETE FROM companions
WHERE id = 'your-companion-id'
AND author = 'your-user-id';
```

## Common Issues and Solutions

### Issue 1: "new row violates row-level security policy"

**Solution**: Make sure the INSERT policy is correctly set up and the `author` field is being set to the authenticated user's ID.

### Issue 2: "permission denied for table companions"

**Solution**: Ensure RLS is enabled and the appropriate policies are in place.

### Issue 3: "relation does not exist"

**Solution**: Make sure the table name is correct and the table exists in your database.

## Verification Steps

1. **Check RLS is enabled**:

   ```sql
   SELECT schemaname, tablename, rowsecurity
   FROM pg_tables
   WHERE tablename = 'companions';
   ```

2. **Check policies exist**:

   ```sql
   SELECT policyname, cmd, qual
   FROM pg_policies
   WHERE tablename = 'companions';
   ```

3. **Test with authenticated user**:
   - Make sure you're logged in to your app
   - Try deleting a companion you created
   - Check the browser console for any errors

## Additional Notes

- The `author` field in your companions table should reference the authenticated user's ID
- Make sure your Supabase client is properly configured with authentication
- The delete function includes authorization checks to ensure users can only delete their own companions

## Troubleshooting

If you're still having issues:

1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Ensure your Supabase project has the correct configuration
4. Test the deletion through the Supabase dashboard directly

## Security Considerations

- The RLS policies ensure users can only delete their own companions
- The server-side function includes additional authorization checks
- The UI includes confirmation dialogs to prevent accidental deletions
